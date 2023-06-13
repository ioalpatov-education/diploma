import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/categories`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
