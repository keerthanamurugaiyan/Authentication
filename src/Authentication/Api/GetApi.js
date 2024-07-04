import axios from "axios";
import { baseApi } from "./BaseApi";

const getApi = '/api/user/getUser/';
export const GetUserApi = async(payload,token) => {

    try{

        const response = await axios.get(`${baseApi} ${getApi} ${payload}`,{ 
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