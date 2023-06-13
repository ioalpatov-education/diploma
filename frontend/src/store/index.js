import { configureStore } from "@reduxjs/toolkit";
import shoesReducer from "./slices/shoesSlice";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    shoes: shoesReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);
