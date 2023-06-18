import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const allCategoryId = nanoid();

const initialState = {
  topSales: {
    items: [],
    loading: false,
  },
  shoeCatalog: {
    items: [],
    loading: false,
    isGetMore: false,
    search: "",
  },
  categories: {
    items: [{ id: allCategoryId, title: "Все" }],
    selectedCategoryId: allCategoryId,
    loading: false,
  },
  shoeDetails: {
    details: null,
    loading: false,
    error: null,
  },
  shoppingCart: {
    items: [],
    totalCost: 0,
    loading: false,
  },
};

const typesForToasts = {
  topSales: "Хиты продаж",
  shoeCatalog: "Каталог",
  categories: "Категории",
  shoeDetails: "Детали товара",
  shoppingCart: "Оформление заказа",
};

export const shoesSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    exposeError: (state, action) => {
      const { type, error } = action.payload;
      toast.error(`${typesForToasts[type]}: ${error}`);
      state[type].loading = false;

      if (state[type].hasOwnProperty("error")) {
        state[type].error = error;
      }
    },
    sendRequestToGetCategories: (state) => {
      state.categories.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      const categories = action.payload;
      state.categories.items = [state.categories.items[0], ...categories];
      state.categories.loading = false;
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
    },
    sendRequestToGetShoes: (state) => {
      state.shoeCatalog.loading = true;
    },
    getShoesSuccess: (state, action) => {
      const shoes = action.payload;
      state.shoeCatalog.isGetMore = shoes.length < 6 ? false : true;
      state.shoeCatalog.items = [...state.shoeCatalog.items, ...shoes];
      state.shoeCatalog.loading = false;
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
      state.shoeDetails.error = null;
      state.shoeDetails.loading = false;
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
    sendRequestToOrdering: (state) => {
      state.shoppingCart.loading = true;
    },
    orderingSuccess: (state) => {
      state.shoppingCart.loading = false;
      localStorage.clear();
      toast.success("Заказ успешно оформлен");
      state.shoppingCart.items = [];
      state.shoppingCart.totalCost = 0;
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
  sendRequestToOrdering,
  orderingSuccess,
} = shoesSlice.actions;

export default shoesSlice.reducer;
