import axios from "axios";
import { baseApi } from "./BaseApi";

const delApi = '/api/user/deleteUser/';

export const DeleteUserApi = async (payload, token) => {
  try {
    const response = await axios.get(`${baseApi}${delApi}${payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
      
    });
    return response.data;
console.log(response)

  } catch (error) {
    console.error(error);
    throw error;
  }

};
