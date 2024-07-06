import axios from "axios";
import { baseApi } from "./BaseApi";

const getUserApi = '/api/user/getUser';

export const getUser = async (email, token) => {
  try {
    const response = await axios.get(`${baseApi}${getUserApi}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
