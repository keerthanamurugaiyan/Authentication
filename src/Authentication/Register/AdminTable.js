import React, { useState, useEffect } from 'react';
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
              <th className='bg-info'>User Name</th>
              <th className='bg-info'>Email</th>
              <th className='bg-info'>Mobile Number</th>
              <th className='bg-info'>Status</th>
              <th className='bg-info'>Action</th>
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
                  <button className="btn btn-danger" onClick={() => handleDelete(user.email)}>Delete</button>
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

























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { registerUser } from '../Api/AdminApi';

// const AdminTable = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         setError('Token not found in local storage');
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:8080/api/admin/getAllusers' ,{
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(response.data);
//       } catch (error) {
//         setError('Error fetching user data');
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUsers();
//   }, []);
  
//   if (error) {
//     return (
//       <div className="container tab-style">
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

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

//       // setUsers(null);
//       alert('User deleted successfully');
      
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//     }
//   };

  
//   return (
//     <div className="container tab-style">
//       <div>
//         <h2 className='text-center mt-5'>Admin Profile</h2>
//         <table className="table text-center mt-5 table-stripped">
//           <thead>
//             <tr>
//               <th className='bg-info'>User Name</th>
//               <th className='bg-info'>Email</th>
//               <th className='bg-info'>Mobile Number</th>
//               <th className='bg-info'>Status</th>
//               <th className='bg-info'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users&&users.map(user => (
//               <tr key={user.userId}>
//                 <td>{user.userName}</td>
//                 <td>{user.email}</td>
//                 <td>{user.mobileNo}</td>
//                 <td>{user.status}</td>

//                 <td>
//                   <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTable;
