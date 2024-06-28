import axios from "axios";
import { baseApi } from "./BaseApi";

const LogIn = '/api/auth/user/login';
export const registerUser = async(payload) =>{

    try{

        const response = await axios.post(baseApi + LogIn,payload); 
        return response.data;
    } 
    catch (error){ 
        console.log(error);
    }
};