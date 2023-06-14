import {
  takeLeading,
  put,
  spawn,
  call,
  delay,
  select,
} from "redux-saga/effects";
import {
  sendRequestToGetCategories,
  getCategoriesSuccess,
  exposeError,
  sendRequestToGetTopSales,
  getTopSalesSuccess,
  sendRequestToGetShoes,
  getShoesSuccess,
} from "../slices/shoesSlice";
import { getCategories, getTopSales, getShoes } from "../api";

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

  yield call(useApiToGetData, getShoes, "shoeCatalog", getShoesSuccess, {
    categoryId: categories.selectedCategoryId,
    offset: shoeCatalog.items.length,
  });
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

export default function* saga() {
  yield spawn(watchCategoriesSaga);
  yield spawn(watchTopSalesSaga);
  yield spawn(watchShoesSaga);
}
