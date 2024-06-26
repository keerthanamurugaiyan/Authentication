// import axios from 'axios';
// // import Edit from './Edit';

// const SignApi= 'http://localhost:8080/api/auth/user/register';
// const LoginApi = 'http://localhost:8080/api/auth/user/login';

// // post....sign
// export const createUser = async(register) =>{

//     try{

//         const response = await  axios.post(SignApi,register); 
//         return response.data;
//     } 
//     catch (error){ 
//         console.log(error);
//     }
// };

// // post....login
// export const loginUser = async(login) => {

//     try{

//         const response = await axios.post(LoginApi,login);
//         return response.data;
//     }
//     catch (error){
//         console.log(error);
//     }

// };


// // gettable
// // export const getUser = async () => {
// //     try {
// //         const response = await axios.get(Api);
// //         return response;
// //     } catch (error) {
// //         throw error; // Throw the error to be caught by the caller
// //     }
// // }

// // delete
// // export const deleteUser = async(id) =>{
// //     try{
// //         await axios.delete(`${Api}/${id}`)
// //     }
// //     catch (error){
// //         console.log(error)
// //     }
// // }

// // Edit
// // export const editUser = async(id) =>{
// //     try{
// //         const response=await axios.get(`${Api}/${id}`)
// //         return response.data;
// //     }
// //     catch (error){
// //         console.log(error)
// //     }
// // }

// // update
// // export const updateUser = async (id, newData) => {
// //     try {
// //         const response = await axios.put(`${Api}/${id}`, newData);
// //         return response.data;
// //     } catch (error) {
// //         console.log(error);
// //     }
// // };



