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
    isGetMore: true,
  },
  categories: {
    items: [{ id: allCategoryId, title: "Все" }],
    selectedCategoryId: null,
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
    sendRequestToGetCategories: (state) => {
      state.categories.loading = true;
    },

    getCategoriesSuccess: (state, action) => {
      const categories = action.payload;
      state.categories.items = [state.categories.items[0], ...categories];
      state.categories.loading = false;
      state.categories.error = null;
    },
    changeSelectCategoryId: (state, action) => {
      const categoryId = action.payload;
    },
    sendRequestToGetTopSales: (state) => {
      state.topSales.loading = true;
    },
    getTopSalesSuccess: (state, action) => {
      const topSales = action.payload;
      state.topSales.items = topSales;
      state.topSales.loading = false;
      state.topSales.error = null;
    },
    sendRequestToGetShoes: (state, action) => {
      // const { categoryId, offset } = action.payload;
      state.shoeCatalog.loading = true;
    },
    getShoesSuccess: (state, action) => {
      const shoes = action.payload;
      state.shoeCatalog.isGetMore = shoes.length < 6 ? false : true;
      state.shoeCatalog.items = [...state.shoeCatalog.items, ...shoes];
      state.shoeCatalog.loading = false;
      state.shoeCatalog.error = null;
    },
  },
});

export const {
  sendRequestToGetCategories,
  getCategoriesSuccess,
  exposeError,
  sendRequestToGetTopSales,
  getTopSalesSuccess,
  sendRequestToGetShoes,
  getShoesSuccess,
} = shoesSlice.actions;

export default shoesSlice.reducer;
