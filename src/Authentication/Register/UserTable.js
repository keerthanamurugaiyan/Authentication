import React, { useEffect, useState } from 'react';
import { GetUserApi } from '../Api/GetApi';
// import { DeleteUserApi } from '../Api/Delete';
import { useNavigate } from 'react-router-dom';
import { MdDeleteSweep } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import axios from 'axios';

export const UserTable = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState(false);
    const [formValues, setFormValues] = useState({
        userId:'',
        userName: '',
        email: '',
        mobileNo: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (email && token) {
            fetchUser(email, token);
        }
    }, [email, token]);

    async function fetchUser(email, token) {
        try {
            const response = await GetUserApi(email, token);
            const { Authority, Details } = response;
            setUser({
                ...Details,
                role: Authority?.[0]?.authority || 'No Role'
            });
            setEdit(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError(error);
        }
    }

    // const handleDelete = async () => {
    //     try {
    //         await DeleteUserApi(email, token);
    //         navigate('/login');
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleEdit = () => {
        setFormValues({
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            mobileNo: user.mobileNo,
            userRole: user.userRole,
            status: user.status,
            password: '',
            confirmPassword: ''
        });
        setEdit(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user.userId,
            userName: formValues.userName,
            email: formValues.email,
            mobileNo: formValues.mobileNo,
            userRole: user.userRole,
            status: user.status,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword
        };

        try {
            await axios.put(
                `http://localhost:8080/api/user/update`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchUser(email, token); 
            setEdit(false);
        } catch (err) {
            const defaultError = {
                error: { reason: 'Unknown error occurred' },
                timeStamp: new Date().toISOString(),
            };
            setError(err.response?.data || defaultError);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        const useremail = localStorage.getItem('email');
    
        if (!token || !useremail) {
          setError({ error: { reason: 'Token or email not found in local storage' } });
          return;
        }
    
        try {
          await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setUser(null);
          alert('User deleted successfully');
          navigate('/loginpage');
        } catch (err) {
          const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
          setError(err.response?.data || defaultError);
        }
      };
    



    return (
        <>
            {edit ? (
                <div className="d-flex justify-content-center">
                    
        
    <div className="container d-flex justify-content-center align-items-center mt-2">
        <div className="row bg-light rounded-5 p-4">
            <form onSubmit={handleUpdate} className="d-flex pe-5 flex-row align-items-center rounded-5 w-100 p-3">
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img src="/update.jpg" alt="Profile" width="300px" height="400px" />
                </div>
                <div className="col-md-6">
                    <h2 className='mt-2 mb-3'>Enhance Your Profile</h2>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Name :</label>
                        <input
                            name="userName"
                            value={formValues.userName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Email :</label>
                        <input
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Mobile No :</label>
                        <input
                            id="mobileNo"
                            name="mobileNo"
                            value={formValues.mobileNo}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Password :</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Confirm Password :</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className='justify-content-end d-flex me- mt-3'>
                        <button type="submit" className="btn regbtn text-light justify-content-end">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    </div>


                
            ) : (
                <div>
                    <h3 className='text-center mt-5'>Data Management</h3>
                <div className="w- d-flex justify-content-center mt- pt-">
                    
                    <table className="table table-striped  w-75 ms- mt-5">
                        <thead className='text-center bg-secendary'>
                            <tr>
                                <th className='bg-secondary text-light'>Name</th>
                                <th className='bg-secondary text-light'>Email</th>
                                <th className='bg-secondary text-light'>Mobile No</th>
                                <th className='bg-secondary text-light'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            <tr>
                                <td>{user?.userName}</td>
                                <td>{user?.email}</td>
                                <td>{user?.mobileNo}</td>
                                <td>
                                    <button 
                                        className="btn regbtn text-light text-center fs-5" 
                                        onClick={handleEdit}
                                    >
                                        <MdEditNote />
                                    </button>
                                    <button 
                                        className="btn btn-danger m-2 regbtn text-light text-center fs-5" 
                                        onClick={handleDelete}
                                    >
                                        <MdDeleteSweep />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            )}
        </>
    );
};

export default UserTable;




























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getUser } from '../Api/UserApi'; // Adjust this import based on your API implementation

// const UserTable = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: '',
//     userName: '',
//     email: '',
//     phone: '',
//     status: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//       const useremail = localStorage.getItem('email');

//   useEffect(() => {
//     const fetchUserData = async () => {
      

//       if (!token || !useremail) {
//         setError({ error: { reason: 'Token or email not found in local storage' } });
//         return;
//       }

//       try {
//         const response = await getUser(useremail, token); // Adjust this call based on your API implementation

//         setUserData(response);
//         setFormData({
//           id: response.Details.id,
//           userName: response.Details.userName,
//           email: response.Details.email,
//           phone: response.Details.mobileNo, // Ensure this matches the API response
//           status: response.Details.status,
//           password: '',
//           confirmPassword: ''
//         });
//       } catch (err) {
//         const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//         setError(err.response?.data || defaultError);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or email not found in local storage' } });
//       return;
//     }

//     try {
//       const response = await getUser(useremail, token); // Adjust this call based on your API implementation

//       setUserData(response);
//       setFormData({
//         id: response.Details.id,
//         userName: response.Details.userName,
//         email: response.Details.email,
//         phone: response.Details.mobileNo,
//         status: response.Details.status,
//         password: '',
//         confirmPassword: ''
//       });

//       setIsEditing(true);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   // const handleUpdate = async () => {
//   //   const token = localStorage.getItem('token');

//   //   if (!token) {
//   //     setError({ error: { reason: 'Token not found in local storage' } });
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.put(
//   //       'http://localhost:8080/api/user/update',
//   //       {
//   //         id: formData.id,
//   //         userName: formData.userName,
//   //         email: formData.email,
//   //         mobileNo: formData.phone,
//   //         status: formData.status,
//   //         password: formData.password,
//   //         confirmPassword: formData.confirmPassword
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       }
//   //     );

    
//   //   } catch (err) {
//   //     const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//   //     setError(err.response?.data || defaultError);
//   //   }
//   // };


//   const handleUpdate = async () => {
//     const token = localStorage.getItem('token');
  
//     // if (!token) {
//     //   setError({ error: { reason: 'Token not found in local storage' } });
//     //   return;
//     // }
  
//     try {
//       const response = await axios.put(
//         'http://localhost:8080/api/user/update',
//         // {
//         //   userId: formData.userId,
//         //   userName: formData.userName,
//         //   email: formData.email,
//         //   mobileNo: formData.phone,
//         //   status: formData.status,
//         //   password: formData.password,
//         //   confirmPassword: formData.confirmPassword
//         // },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       // Handle successful update response, if needed
//       console.log('Update success:', response.data); // Example log message
  
//       // Optionally, update the local userData state or take other actions after successful update
//       // For example, navigate to another page or refresh data
//       // setUserData(response.data); // Update userData state with the response data
  
//       // Reset editing mode
//       // setIsEditing(false);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };
  
//   const handleDelete = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or email not found in local storage' } });
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(null);
//       alert('User deleted successfully');
//       navigate('/loginpage');
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error.error?.reason || 'No error message available'}</p>
//         <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container tab-style">
//       {userData ? (
//         <div>
//           <h2 className='mt-5 text-center'>User Profile</h2>
//           {isEditing ? (
//             <div className='d-flex justify-content-center mt-5 p-'> 
//             <form className='p-3 w-50 rounded-5'>
//               <h2 className='mx-1 mb-2'>Enhance Your Profile</h2>
//               <div className='mt-3 mx-4'>
//               <label className='mt- '>
//                 User Name:
//                 <input
//                   className="form-control mt-"
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className='mx-4'>
//                 Email:
//                 <input
//                   className="form-control mx-"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               </div>

//               <div className='mt-3 mx-4'>
//               <label className=''>
//                 Mobile Number:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className='mx-4'>
//                 Status:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               </div>

//               <div className='mt-3 mx-4'>
//               <label>
//                 Password:
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className='mx-4'>
//                 Confirm Password:
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               </div>
//               <div className='mt-3 d-flex justify-content-end'>
//                 <button className="regbtn btn me-2" onClick={handleUpdate}>Save</button>
//                 <button className=" regbtn btn me-2" onClick={() => setIsEditing(false)}>Cancel</button>
//               </div>
//             </form>
//             </div>
//           ) : (
//             <div>
//               <table className="table table-striped text-center mt-5">
//                 <thead>
//                   <tr>
//                     <th>User Name</th>
//                     <th>Email</th>
//                     <th>Mobile Number</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{userData.Details.userName}</td>
//                     <td>{userData.Details.email}</td>
//                     <td>{userData.Details.mobileNo}</td>
//                     <td>{userData.Details.status}</td>
//                     <td>
//                       <button className="regbtn btn" onClick={handleEdit}>Edit</button>
//                       <button className="regbtn btn mx-1" onClick={handleDelete}>Delete</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserTable;





























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getUser } from '../Api/UserApi';

// const UserTable = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: '',
//     userName: '',
//     email: '',
//     phone: '',
//     status: '',
//     password:'',
//     confirmPassword:''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       const useremail = localStorage.getItem('email');

//       if (!token || !useremail) {
//         setError({ error: { reason: 'Token or username not found in local storage' } });
//         return;
//       }

//       try {
//         const response = await getUser(useremail, token);

//         setUserData(response);
//         setFormData({
//           id: response.Details.id,
//           userName: response.Details.userName,
//           email: response.Details.email,
//           phone: response.Details.mobileNo, // Ensure this matches the API response
//           status: response.Details.status,
//           password: response.Details.password,
//           confirmPassword: response.Details.confirmPassword,
//         });
//       } catch (err) {
//         const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//         setError(err.response?.data || defaultError);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       const response = await getUser(useremail, token);

//       setUserData(response);
//       setFormData({
//         id: response.Details.userId,
//         userName: response.Details.userName,
//         email: response.Details.email,
//         phone: response.Details.mobileNo,
//         status: response.Details.status,
        
//       });

//       setIsEditing(true);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError({ error: { reason: 'Token not found in local storage' } });
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:8080/api/user/update`, {
//         id: formData.id,
//         userName: formData.userName,
//         email: formData.email,
//         phone: formData.phone,
//         status: formData.status,
//         password:formData.password,
//         confirmPassword:formData.confirmPassword
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(response.data.Details);
//       setIsEditing(false);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   const handleDelete = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(null);
//       alert('User deleted successfully');
//       navigate('/loginpage');
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error.error?.reason || 'No error message available'}</p>
//         <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container tab-style">
//       {userData ? (
//         <div>
//           <h2 className='mt-5 text-center'>User Profile</h2>
//           {isEditing ? (
//             <div>
//               <label>
//                 User Name:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Email:
//                 <input
//                   className="form-control"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Mobile Number:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Status:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 password:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 confirm password:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
//               <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <table className="table table text-center mt-5 table-stripped">
//                 <thead>
//                   <tr>
//                     <th className='bg-info'>User Name</th>
//                     <th className='bg-info'>Email</th>
//                     <th className='bg-info'>Mobile Number</th>
//                     <th className='bg-info'>Status</th>
//                     <th className='bg-info'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{userData.Details.userName}</td>
//                     <td>{userData.Details.email}</td>
//                     <td>{userData.Details.mobileNo}</td>
//                     <td>{userData.Details.status}</td>
//                     <td>
//                       <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
//                       <button className="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//       <p>Loading....</p> 
//       )}
//     </div>
//   );
// };

// export default UserTable;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getUser } from '../Api/UserApi';

// const UserTable = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: '',
//     userName: '',
//     email: '',
//     phone: '',
//     status: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       const useremail = localStorage.getItem('email');

//       if (!token || !useremail) {
//         setError({ error: { reason: 'Token or username not found in local storage' } });
//         return;
//       }

//       try {
//         const response = await getUser(useremail, token);
//         setUserData(response);

//         setFormData({
//           id: response.Details.id,
//           userName: response.Details.userName,
//           email: response.Details.email,
//           phone: response.Details.mobileNo,
//           status: response.Details.status,
//           password: '',
//           confirmPassword: ''
//         });
//       } catch (err) {
//         const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//         setError(err.response?.data || defaultError);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       const response = await getUser(useremail, token);
//       setFormData({
//         userId: response.Details.userId,
//         userName: response.Details.userName,
//         email: response.Details.email,
//         phone: response.Details.mobileNo,
//         status: response.Details.status,
//         password: '',
//         confirmPassword: ''
//       });
//       setIsEditing(true);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   // const handleUpdate = async () => {
//   //   const token = localStorage.getItem('token');
  
//   //   if (!token) {
//   //     setError({ error: { reason: 'Token not found in local storage' } });
//   //     return;
//   //   }
  
//   //   try {
//   //     const response = await axios.put(`http://localhost:8080/api/user/update`, {
//   //       id: formData.id,
//   //       userName: formData.userName,
//   //       email: formData.email,
//   //       phone: formData.phone,
//   //       status: formData.status,
//   //       password: formData.password,
//   //       confirmPassword: formData.confirmPassword
//   //     }, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
  
//   //     console.log('Response data:', response.data); // Log the response data to the console
  
//   //     setUserData(response.data.Details);
//   //     setIsEditing(false);
//   //   } catch (err) {
//   //     const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//   //     setError(err.response?.data || defaultError);
//   //   }
//   // };
  

//   const handleUpdate = async () => {
//   const token = localStorage.getItem('token');
  
//   if (!token) {
//     setError({ error: { reason: 'Token not found in local storage' } });
//     return;
//   }

//   try {
//     // Log formData to check the data being sent
//     console.log('Form Data:', formData);

//     const response = await axios.put(`http://localhost:8080/api/user/update`, {
//       userId: formData.userId,
//       userName: formData.userName,
//       email: formData.email,
//       phone: formData.phone,
//       status: formData.status,
//       password: formData.password,
//       confirmPassword: formData.confirmPassword
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Log the response data to check the received data
//     console.log('Response data:', response.data);

//     setUserData(response.data.Details);
//     setIsEditing(false);
//   } catch (err) {
//     // Log the error to check the exact issue
//     console.error('Error:', err);
//     const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//     setError(err.response?.data || defaultError);
//   }
// };

  
//   const handleDelete = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(null);
//       alert('User deleted successfully');
//       navigate('/loginpage');
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };



//   return (
//     <div className="container tab-style">
//       {userData ? (
//         <div>
//           <h2 className='mt-5 text-center'>User Profile</h2>
//           {isEditing ? (
//             <div>
//               <label>
//                 User Name:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Email:
//                 <input
//                   className="form-control"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Mobile Number:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Status:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Password:
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Confirm Password:
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
//               <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <table className="table table text-center mt-5 table-striped">
//                 <thead>
//                   <tr>
//                     <th className='bg-info'>User Name</th>
//                     <th className='bg-info'>Email</th>
//                     <th className='bg-info'>Mobile Number</th>
//                     <th className='bg-info'>Status</th>
//                     <th className='bg-info'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{userData.Details.userName}</td>
//                     <td>{userData.Details.email}</td>
//                     <td>{userData.Details.mobileNo}</td>
//                     <td>{userData.Details.status}</td>
//                     <td>
//                       <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
//                       <button className="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading....</p>
//       )}
//     </div>
//   );
// };

// export default UserTable;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getUser } from '../Api/UserApi';

// const UserTable = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: '',
//     userName: '',
//     email: '',
//     phone: '',
//     status: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       const useremail = localStorage.getItem('email');

//       if (!token || !useremail) {
//         setError({ error: { reason: 'Token or username not found in local storage' } });
//         return;
//       }

//       try {
//         const response = await getUser(useremail, token);
//         setUserData(response);

//         setFormData({
//           id: response.Details.id,
//           userName: response.Details.userName,
//           email: response.Details.email,
//           phone: response.Details.mobileNo,
//           status: response.Details.status,
//           password: '',
//           confirmPassword: ''
//         });
//       } catch (err) {
//         const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//         setError(err.response?.data || defaultError);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError({ error: { reason: 'Token not found in local storage' } });
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:8080/api/user/update`, {
//         id: formData.id,
//         userName: formData.userName,
//         email: formData.email,
//         phone: formData.phone,
//         status: formData.status,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(response.data.Details);
//       setIsEditing(false);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   const handleDelete = async () => {
//     const token = localStorage.getItem('token');
//     const useremail = localStorage.getItem('email');

//     if (!token || !useremail) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(null);
//       alert('User deleted successfully');
//       navigate('/loginpage');
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error.error?.reason || 'No error message available'}</p>
//         <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container tab-style">
//       {userData ? (
//         <div>
//           <h2 className='mt-5 text-center'>User Profile</h2>
//           {isEditing ? (
//             <div>
//               <label>
//                 User Name:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Email:
//                 <input
//                   className="form-control"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Mobile Number:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Status:
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Password:
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Confirm Password:
//                 <input
//                   className="form-control"
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
//               <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <table className="table table text-center mt-5 table-striped">
//                 <thead>
//                   <tr>
//                     <th className='bg-info'>User Name</th>
//                     <th className='bg-info'>Email</th>
//                     <th className='bg-info'>Mobile Number</th>
//                     <th className='bg-info'>Status</th>
//                     <th className='bg-info'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{userData.Details.userName}</td>
//                     <td>{userData.Details.email}</td>
//                     <td>{userData.Details.mobileNo}</td>
//                     <td>{userData.Details.status}</td>
//                     <td>
//                       <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
//                       <button className="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading....</p>
//       )}
//     </div>
//   );
// };

// export default UserTable;
