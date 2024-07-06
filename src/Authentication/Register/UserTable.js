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
