import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Api/UserApi';
// import './register.css';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    email: '',
    phone: '',
    status: '',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const useremail = localStorage.getItem('email');

      if (!token || !useremail) {
        setError({ error: { reason: 'Token or username not found in local storage' } });
        return;
      }

      try {
        const response = await axios.get(registerUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.headers['content-type'] !== 'application/json') {
          throw new Error('Server did not respond with JSON data');
        }

        setUserData(response.data);
        setFormData({
          id: response.data.Details.id,
          userName: response.data.Details.userName,
          email: response.data.Details.email,
          phone: response.data.Details.phone,
          status: response.data.Details.status,
        });
      } catch (err) {
        const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
        setError(err.response?.data || defaultError);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        setError({ error: { reason: 'Token not found in local storage' } });
        return;
    }

    try {
        const response = await axios.put(`http://localhost:8080/api/user/update`, {
            id: formData.id,
            userName: formData.userName,
            email: formData.email,
            phone: formData.phone,
            status: formData.status,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setUserData(response.data.Details);
        setIsEditing(false);
    } catch (err) {
        const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
        setError(err.response?.data || defaultError);
    }
};

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const useremail = localStorage.getItem('email');

    if (!token || !useremail) {
      setError({ error: { reason: 'Token or username not found in local storage' } });
      return;
    }

    try {
      await axios.delete(registerUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(null);
      alert('User deleted successfully');
      navigate('/login');
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: {error.error?.reason || 'No error message available'}</p>
  //       <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="container tab-style">
      {userData ? (
        <div>
          <h2>User Profile</h2>
          {isEditing ? (
            <div>
              <label>
                User Name:
                <input
                  className="form-control"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mobile Number:
                <input
                  className="form-control"
                  type="text"
                  name="mobileNo"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <input
                  className="form-control"
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </label>
              <button className="btn btn-primary" onClick={handleEdit}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userData.Details.userName}</td>
                    <td>{userData.Details.email}</td>
                    <td>{userData.Details.mobileNo}</td>
                    <td>{userData.Details.status}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>Deleted...</p>
      )}
    </div>
  );
};

export default UserTable;






















// import React from 'react'

// function UserTable() {
//     return (
//         <>

//         <div>

//             <h1 className='text-center mt-5'>Users Data</h1>

//             <table className='table text-center mt-5 w-75 mx-5' style={{backgroundColour: 'green'}}>
                
//                 <thead>
//                     <tr>
//                         <th>UserName</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Password</th>
//                         <th>Confirm Password</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     <tr></tr>
//                 </tbody>
            
//             </table>
//         </div>

//         </>
//     )
// }

// export default UserTable
