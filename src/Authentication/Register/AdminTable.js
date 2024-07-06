import React, { useState, useEffect } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import axios from 'axios';

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
        const response = await axios.get('http://localhost:8080/api/admin/getAllusers', {
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

  const handleDelete = async (email) => {
    const token = localStorage.getItem('token');

    if (!token || !email) {
      setError({ error: { reason: 'Token or email not found in local storage' } });
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUser/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter(user => user.email !== email));
      alert('Admin deleted successfully');
      
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
    }
  };

  return (
    <div className="container tab-style">
      <div>
        <h2 className='text-center mt-5'>Admin Profile</h2>
        <table className="table text-center mt-5 table-stripped">
          <thead>
            <tr>
              <th className='bg-secondary'>User Name</th>
              <th className='bg-secondary'>Email</th>
              <th className='bg-secondary'>Mobile Number</th>
              <th className='bg-secondary'>Status</th>
              <th className='bg-secondary'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>{user.status}</td>
                <td>
                <button 
                  className="btn btn-danger m-2 regbtn text-light text-center fs-5" 
                  onClick={handleDelete}
                  >
                     <MdDeleteSweep />
                  </button>
                  {/* <button className="btn btn-danger" onClick={() => handleDelete(user.email)}>Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
