import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure(); 
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosSecure.get('/property'); 
        const verifiedProperties = response.data.filter(
          (property) => property.verificationStatus === 'Verified'
        );
        setProperties(verifiedProperties);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [axiosSecure]);

  const handleAdvertise = (property) => {

    navigate('/', { state: { propertyId: property._id } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Advertise Properties</h2>

      {properties.length === 0 ? (
        <p>No verified properties to advertise.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Property Image</th>
                <th className="px-4 py-2 text-left border-b">Title</th>
                <th className="px-4 py-2 text-left border-b">Price Range</th>
                <th className="px-4 py-2 text-left border-b">Agent Name</th>
                <th className="px-4 py-2 text-left border-b">Advertise</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td className="px-4 py-2 border-b">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{property.title}</td>
                  <td className="px-4 py-2 border-b">
                    {property.priceRange.minimumPrice} -- {property.priceRange.maximumPrice}
                  </td>
                  <td className="px-4 py-2 border-b">{property.agentName}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleAdvertise(property)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Advertise
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

export default AdvertiseProperty;
