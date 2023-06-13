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
} from "../slices/shoesSlice";
import { getCategories } from "../api";

function* updateApi({ api, id }) {
  while (true) {
    try {
      const apiResponse = yield call(api, id);
      return apiResponse;
    } catch (error) {
      yield delay(3000);
    }
  }
}

function* handleCategoriesSaga() {
  try {
    const data = yield call(getCategories);
    yield put(getCategoriesSuccess(data));
  } catch (e) {
    yield put(
      exposeError({
        error: e,
        type: "categories",
      })
    );
  }
}

// function* handleNewsListWithLastSeenIdSaga() {
//   const lastSeenId = yield select((state) => state.news.lastSeenId);

//   try {
//     const data = yield call(updateApi, {
//       api: getNewsListWithLastSeenId,
//       id: lastSeenId,
//     });
//     yield put(receiptNewsSuccess(data));
//   } catch (e) {}
// }

function* watchCategoriesSaga() {
  yield takeLeading(sendRequestToGetCategories.type, handleCategoriesSaga);
}

// function* watchNewsListWithLastSeenIdSaga() {
//   yield takeLeading(
//     sendRequestToReceiveNewsWithLastSeenId.type,
//     handleNewsListWithLastSeenIdSaga
//   );
// }

export default function* saga() {
  yield spawn(watchCategoriesSaga);
  // yield spawn(watchNewsListWithLastSeenIdSaga);
}
