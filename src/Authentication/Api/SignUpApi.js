import axios from "axios";
import { baseApi } from "./BaseApi";

const SignUp = '/api/auth/user/register';
export const registerUser = async(payload) =>{

    try{

        const response = await axios.post(baseApi+SignUp,payload); 
        return response.data;
        // console.log(response)
    } 
    catch (error){ 
        console.log(error);
    }
};