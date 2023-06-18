import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/categories`);
    return data;
  } catch (err) {
    if (err && err.message) {
      throw new Error(err.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

export const getTopSales = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/top-sales`);
    return data;
  } catch (err) {
    if (err && err.message) {
      throw new Error(err.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

export const getShoes = async ({ categoryId, offset, q }) => {
  try {
    const { data } = await axios.get(`${API_URL}/items`, {
      params: {
        categoryId,
        offset,
        q,
      },
    });

    return data;
  } catch (err) {
    if (err && err.message) {
      throw new Error(err.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

export const getShoeDetails = async ({ shoeId }) => {
  try {
    const { data } = await axios.get(`${API_URL}/items/${shoeId}`);

    return data;
  } catch (err) {
    if (err && err.message) {
      throw new Error(err.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};

export const makeOrder = async ({ owner, items }) => {
  try {
    const { data } = await axios.post(`${API_URL}/order`, {
      owner,
      items,
    });

    return data;
  } catch (err) {
    if (err && err.message) {
      throw new Error(err.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
};
