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
    isGetMore: false,
    search: "",
  },
  categories: {
    items: [{ id: allCategoryId, title: "Все" }],
    selectedCategoryId: allCategoryId,
    loading: false,
    error: null,
  },
  shoeDetails: {
    details: null,
    loading: false,
    error: null,
  },
  shoppingCart: {
    items: [],
    totalCost: 0,
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
      state.categories.selectedCategoryId = categoryId;
      state.shoeCatalog.items = [];
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
    sendRequestToGetShoes: (state) => {
      state.shoeCatalog.loading = true;
    },
    getShoesSuccess: (state, action) => {
      const shoes = action.payload;
      state.shoeCatalog.isGetMore = shoes.length < 6 ? false : true;
      state.shoeCatalog.items = [...state.shoeCatalog.items, ...shoes];
      state.shoeCatalog.loading = false;
      state.shoeCatalog.error = null;
    },
    resetShoesCatalogWithCategories: (state) => {
      state.shoeCatalog.items = [];
      state.shoeCatalog.isGetMore = false;
    },
    changeSearchInput: (state, action) => {
      const search = action.payload;
      state.shoeCatalog.search = search;
    },
    sendRequestToGetShoeDetails: (state) => {
      state.shoeDetails.loading = true;
    },
    getShoeDetailsSuccess: (state, action) => {
      const details = action.payload;
      state.shoeDetails.details = { ...details };
      state.shoeDetails.loading = false;
      state.shoeDetails.error = null;
    },
    getCartShoesFromLocalStorage: (state) => {
      const items = [];
      for (const key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) continue;

        const cartItem = JSON.parse(localStorage.getItem(key));
        items.push({
          ...cartItem,
          id: +key.split("-")[0],
          size: key.split("-")[1],
        });
      }

      state.shoppingCart.items = [...items];

      state.shoppingCart.totalCost = items.reduce((prev, cur) => {
        const { quantity, price } = cur;
        prev += price * quantity;

        return prev;
      }, 0);
    },
  },
});

export const {
  changeSelectCategoryId,
  sendRequestToGetCategories,
  getCategoriesSuccess,
  exposeError,
  sendRequestToGetTopSales,
  getTopSalesSuccess,
  sendRequestToGetShoes,
  getShoesSuccess,
  resetShoesCatalogWithCategories,
  changeSearchInput,
  sendRequestToGetShoeDetails,
  getShoeDetailsSuccess,
  getCartShoesFromLocalStorage,
} = shoesSlice.actions;

export default shoesSlice.reducer;
