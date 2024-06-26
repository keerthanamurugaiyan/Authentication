import axios from "axios";
import { baseApi } from "./BaseApi";

const SignUp = '/api/auth/admin/register';
export const registerUser = async(payload) =>{

    try{

        const response = await axios.post(baseApi + SignUp,payload); 
        return response.data;
    } 
    catch (error){ 
        console.log(error);
    }
};