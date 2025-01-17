import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure'; // Importing axios instance with interceptors
import { toast } from 'react-toastify';

const AdminPropertymanage = () => {
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch properties from backend
    axiosSecure.get('/property')
      .then((response) => {
        setProperties(response.data); // Store the properties in state
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        toast.error('Failed to fetch properties');
      });
  }, [axiosSecure]);

  const handleVerify = (propertyId) => {
    axiosSecure.patch(`/property/verify/${propertyId}`, { status: 'verified' })
      .then((response) => {
        toast.success('Property verified successfully');
        setProperties(properties.map(property => 
          property._id === propertyId ? { ...property, verificationStatus: 'Verified' } : property
        ));
      })
      .catch((error) => {
        toast.error('Error verifying property');
        console.error(error);
      });
  };
  
  const handleReject = (propertyId) => {
    axiosSecure.patch(`/property/reject/${propertyId}`, { status: 'rejected' })
      .then((response) => {
        toast.success('Property rejected');
        setProperties(properties.map(property => 
          property._id === propertyId ? { ...property, verificationStatus: 'Rejected' } : property
        ));
      })
      .catch((error) => {
        toast.error('Error rejecting property');
        console.error(error);
      });
  };
  

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Manage Properties</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Property Title</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Agent Name</th>
              <th className="py-3 px-6 text-left">Agent Email</th>
              <th className="py-3 px-6 text-left">Price Range</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-700">{property.title}</td>
                <td className="py-3 px-6 text-gray-700">{property.location}</td>
                <td className="py-3 px-6 text-gray-700">{property.agentName}</td>
                <td className="py-3 px-6 text-gray-700">{property.agentEmail}</td>
                <td className="py-3 px-6 text-gray-700">
                  {property.priceRange ? `${property.priceRange.minimumPrice} - ${property.priceRange.maximumPrice}` : 'Not Available'}
                </td>
                <td className="py-3 px-6 space-x-2">
                  {property.verificationStatus ? (
                    <span className={property.verificationStatus === 'Verified' ? 'text-green-500' : 'text-red-500'}>
                      {property.verificationStatus}
                    </span>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerify(property._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPropertymanage;
