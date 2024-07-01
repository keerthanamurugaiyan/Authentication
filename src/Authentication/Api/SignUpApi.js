// import axios from "axios";
// import { baseApi } from "./BaseApi";

// const SignUp = '/api/auth/user/register';
// export const registerUser = async(payload) =>{

//     try{
//         console.log(baseApi+SignUp,payload);
//         const response = await axios.post(baseApi+SignUp,payload); 
//         console.log(response);
//         return response.data;
        
//     } 
    
//     catch (error){ 
//         console.log(error);
//     }
// };


// import axios from "axios";
// import { baseApi } from "./BaseApi";

// const SignUp = '/api/auth/user/register';

// export const registerUser = async(payload) =>{
//     try{
//         console.log(baseApi + SignUp, payload);
//         const response = await axios.post(baseApi + SignUp, payload); 
//         console.log(response);
//         return response.data;
//     } catch (error){ 
//         console.log(error);
//         throw error;
//     }
// };




import axios from "axios";
import { baseApi } from "./BaseApi";

const SignUp = '/api/auth/user/register';

export const registerUser = async(payload) =>{
    try {
        console.log("Request URL:", baseApi + SignUp);
        console.log("Request Payload:", payload);
        
        const response = await axios.post(baseApi + SignUp, payload); 
        
        console.log("Response:", response);
        return response.data; // This will only return the data part of the response
        
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.log("Error Response:", error.response);
        } else if (error.request) {
            // Request was made but no response received
            console.log("Error Request:", error.request);
        } else {
            // Something else happened
            console.log("Error Message:", error.message);
        }
        throw error; // Rethrow the error so it can be handled by the calling function
    }
};

