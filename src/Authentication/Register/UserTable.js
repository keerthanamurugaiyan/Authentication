import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Api/UserApi'; // Adjust this import based on your API implementation

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
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const useremail = localStorage.getItem('email');

      if (!token || !useremail) {
        setError({ error: { reason: 'Token or email not found in local storage' } });
        return;
      }

      try {
        const response = await getUser(useremail, token); // Adjust this call based on your API implementation

        setUserData(response);
        setFormData({
          id: response.Details.id,
          userName: response.Details.userName,
          email: response.Details.email,
          phone: response.Details.mobileNo, // Ensure this matches the API response
          status: response.Details.status,
          password: '',
          confirmPassword: ''
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
    const useremail = localStorage.getItem('email');

    if (!token || !useremail) {
      setError({ error: { reason: 'Token or email not found in local storage' } });
      return;
    }

    try {
      const response = await getUser(useremail, token); // Adjust this call based on your API implementation

      setUserData(response);
      setFormData({
        id: response.Details.id,
        userName: response.Details.userName,
        email: response.Details.email,
        phone: response.Details.mobileNo,
        status: response.Details.status,
        password: '',
        confirmPassword: ''
      });

      setIsEditing(true);
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  // const handleUpdate = async () => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     setError({ error: { reason: 'Token not found in local storage' } });
  //     return;
  //   }

  //   try {
  //     const response = await axios.put(
  //       'http://localhost:8080/api/user/update',
  //       {
  //         id: formData.id,
  //         userName: formData.userName,
  //         email: formData.email,
  //         mobileNo: formData.phone,
  //         status: formData.status,
  //         password: formData.password,
  //         confirmPassword: formData.confirmPassword
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

    
  //   } catch (err) {
  //     const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
  //     setError(err.response?.data || defaultError);
  //   }
  // };


  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError({ error: { reason: 'Token not found in local storage' } });
      return;
    }
  
    try {
      const response = await axios.put(
        'http://localhost:8080/api/user/update',
        {
          userId: formData.userId,
          userName: formData.userName,
          email: formData.email,
          mobileNo: formData.phone,
          status: formData.status,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle successful update response, if needed
      console.log('Update success:', response.data); // Example log message
  
      // Optionally, update the local userData state or take other actions after successful update
      // For example, navigate to another page or refresh data
      // setUserData(response.data); // Update userData state with the response data
  
      // Reset editing mode
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
      setError({ error: { reason: 'Token or email not found in local storage' } });
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUser/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(null);
      alert('User deleted successfully');
      navigate('/loginpage');
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.error?.reason || 'No error message available'}</p>
        <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
      </div>
    );
  }

  return (
    <div className="container tab-style">
      {userData ? (
        <div>
          <h2 className='mt-5 text-center'>User Profile</h2>
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
                  name="phone"
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
              <label>
                Password:
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Confirm Password:
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </label>
              <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <table className="table table-striped text-center mt-5">
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
                      <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                      <button className="btn btn-danger mx-1" onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserTable;





























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