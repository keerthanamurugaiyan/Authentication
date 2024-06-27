import axios from "axios";
import { baseApi } from "./BaseApi";

const AdminApi = '/api/admin/getAllusers';
export const registerUser = async(payload) =>{

    try{

        const response = await axios.post(baseApi + AdminApi,payload); 
        return response.data;
    } 
    catch (error){ 
        console.log(error);
    }
};