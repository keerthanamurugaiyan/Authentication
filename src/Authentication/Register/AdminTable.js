import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { registerUser } from '../Api/AdminApi';

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token not found in local storage');
        return;
      }

      try {
        const response = await axios.get(registerUser ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="container tab-style">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container tab-style">
      <div>
        <h2>Admin Profile</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Mobile Number</th>


              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users&&users.map(user => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.status}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;





















// import React from 'react'

// function AdminTable() {
//     return (
//         <>

//         <div>
//             <h1 className='text-center mt-5'>Users Data</h1>

//             <table className='table text-center mt-5 w-75 mx-5 table-stripped'>
                
//                 <thead className='bg-info'>
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

// export default AdminTable
