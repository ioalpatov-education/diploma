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
  sendRequestToOrdering,
  orderingSuccess,
} from "../slices/shoesSlice";
import {
  getCategories,
  getTopSales,
  getShoes,
  getShoeDetails,
  makeOrder,
} from "../api";

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

function* handleOrderingSaga(action) {
  const { items } = yield select((state) => state.shoes.shoppingCart);

  const owner = action.payload;
  yield call(useApiToGetData, makeOrder, "shoppingCart", orderingSuccess, {
    owner,
    items: items.map((item) => ({
      id: item.id,
      price: item.price,
      count: item.quantity,
    })),
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

function* watchShoeDetailsSaga() {
  yield takeLeading(sendRequestToGetShoeDetails.type, handleShoeDetailsSaga);
}

function* watchOrderingSaga() {
  yield takeLeading(sendRequestToOrdering.type, handleOrderingSaga);
}

export default function* saga() {
  yield spawn(watchCategoriesSaga);
  yield spawn(watchTopSalesSaga);
  yield spawn(watchShoesSaga);
  yield spawn(watchShoeDetailsSaga);
  yield spawn(watchOrderingSaga);
}
