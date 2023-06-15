import { takeLeading, put, spawn, call, select } from "redux-saga/effects";
import {
  sendRequestToGetCategories,
  getCategoriesSuccess,
  exposeError,
  sendRequestToGetTopSales,
  getTopSalesSuccess,
  sendRequestToGetShoes,
  getShoesSuccess,
  sendRequestToGetShoeDetails,
  getShoeDetailsSuccess,
} from "../slices/shoesSlice";
import { getCategories, getTopSales, getShoes, getShoeDetails } from "../api";

function* useApiToGetData(api, type, action, params) {
  try {
    const data = yield call(api, params);
    yield put(action(data));
  } catch (e) {
    yield put(
      exposeError({
        error: e.message,
        type,
      })
    );
  }
}

function* handleCategoriesSaga() {
  yield call(
    useApiToGetData,
    getCategories,
    "categories",
    getCategoriesSuccess
  );
}

function* handleTopSalesSaga() {
  yield call(useApiToGetData, getTopSales, "topSales", getTopSalesSuccess);
}

function* handleShoesSaga() {
  const { categories, shoeCatalog } = yield select((state) => state.shoes);
  const categoryId =
    categories.selectedCategoryId === categories.items[0].id
      ? null
      : categories.selectedCategoryId;

  yield call(useApiToGetData, getShoes, "shoeCatalog", getShoesSuccess, {
    categoryId,
    offset: shoeCatalog.items.length,
    q: !shoeCatalog.search ? null : shoeCatalog.search,
  });
}

function* handleShoeDetailsSaga(action) {
  const shoeId = action.payload;
  yield call(
    useApiToGetData,
    getShoeDetails,
    "shoeDetails",
    getShoeDetailsSuccess,
    {
      shoeId,
    }
  );
}

function* watchCategoriesSaga() {
  yield takeLeading(sendRequestToGetCategories.type, handleCategoriesSaga);
}

function* watchTopSalesSaga() {
  yield takeLeading(sendRequestToGetTopSales.type, handleTopSalesSaga);
}

function* watchShoesSaga() {
  yield takeLeading(sendRequestToGetShoes.type, handleShoesSaga);
}

function* watchShoeDetailsSaga() {
  yield takeLeading(sendRequestToGetShoeDetails.type, handleShoeDetailsSaga);
}

export default function* saga() {
  yield spawn(watchCategoriesSaga);
  yield spawn(watchTopSalesSaga);
  yield spawn(watchShoesSaga);
  yield spawn(watchShoeDetailsSaga);
}
