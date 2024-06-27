import axios from "axios";
import { baseApi } from "./BaseApi";

const UserApi = '/api/user/getUser/{useremail}';
export const registerUser = async(payload) =>{

    try{

        const response = await axios.post(baseApi + UserApi,payload); 
        return response.data;
    } 
    catch (error){ 
        console.log(error);
    }
};