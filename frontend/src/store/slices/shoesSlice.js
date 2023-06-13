import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const allCategoryId = nanoid();

const initialState = {
  topSales: {
    items: [],
    loading: false,
    error: null,
  },
  shoeCatalog: {
    items: [],
    loading: false,
    error: null,
  },
  categories: {
    items: [{ id: allCategoryId, title: "Все" }],
    selectedCategoryId: allCategoryId,
    loading: false,
    error: null,
  },
};

export const shoesSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    exposeError: (state, action) => {
      const { type, error } = action.payload;

      state[type].error = error;
      state[type].loading = false;
    },
    changeLoadingByLoadType: (state, action) => {
      const { loadType, loading } = action.payload;

      state[loadType].loading = loading;
    },
    sendRequestToGetCategories: (state) => {
      state.categories.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      const categories = action.payload;
      state.categories.items = [state.categories.items[0], ...categories];
      state.categories.loading = false;
    },
  },
});

export const { sendRequestToGetCategories, getCategoriesSuccess, exposeError } =
  shoesSlice.actions;

export default shoesSlice.reducer;
