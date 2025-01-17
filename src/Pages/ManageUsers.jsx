import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Loading from '../Component/Loading';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axiosSecure.get('/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate('/login');
        }
      });
  }, [axiosSecure, navigate]);

  const handlePromote = (userId, role) => {
    axiosSecure.patch(`/users/role/${userId}`, { role })
      .then((response) => {
        toast.success(response.data.message || 'User promoted successfully');
        setUsers(users.map(user => user._id === userId ? { ...user, role } : user));
      })
      .catch((error) => {
        console.error('Error promoting user:', error);
        toast.error('Error promoting user');
      });
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${email}`)
          .then((response) => {
            Swal.fire('Deleted!', response.data.message, 'success');
            setUsers(users.filter(user => user.email !== email));
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', 'Failed to delete user.', 'error');
          });
      }
    });
  };

  const handleFraud = (userId) => {
    axiosSecure.patch(`/users/fraud/${userId}`)
      .then((response) => {
        toast.success(response.data.message || 'User marked as fraud');
        setUsers(users.map(user => user._id === userId ? { ...user, role: 'Fraud' } : user));
      })
      .catch((error) => {
        console.error('Error marking user as fraud:', error);
        toast.error('Error marking user as fraud');
      });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Management</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-700">{user.name}</td>
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-gray-700">{user.role || 'User'}</td>
                  <td className="py-3 px-6 space-x-2">
                    <button
                      onClick={() => handlePromote(user._id, 'Admin')}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                      disabled={user.role === 'Fraud'}
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => handlePromote(user._id, 'Agent')}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md"
                      disabled={user.role === 'Fraud'}
                    >
                      Make Agent
                    </button>
                    {user.role === 'Agent' && (
  <button
    onClick={() => handleFraud(user._id)}
    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
  >
    Mark as Fraud
  </button>
)}

                    <button
                      onClick={() => handleDelete(user.email)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
