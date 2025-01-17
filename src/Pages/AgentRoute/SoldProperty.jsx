import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SoldProperty = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 
  const [soldProperties, setSoldProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      
      const fetchSoldProperties = async () => {
        try {
          const response = await axiosSecure.get(`/broughtProperty/${user.email}`);
          const properties = response.data;
          setSoldProperties(properties);

       
          const totalAmount = properties.reduce((sum, property) => sum + parseFloat(property.offerAmount || 0), 0);
          setTotalSoldAmount(totalAmount);
        } catch (err) {
          setError('Failed to fetch properties');
        } finally {
          setLoading(false);
        }
      };

      fetchSoldProperties();
    }
  }, [user?.email, axiosSecure]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Sold Properties</h2>

      {/* Total Sold Amount Section */}
      <div className="bg-gradient-to-r from-blue-400 to-green-500 text-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Total Sold Amount</h3>
        <p className="text-3xl font-bold">${totalSoldAmount.toFixed(2)}</p>
        <p className="text-sm mt-2">This is the total amount of all properties sold by you.</p>
      </div>

      {soldProperties.length === 0 ? (
        <p>No properties have been sold yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Title</th>
                <th className="px-4 py-2 text-left border-b">Location</th>
                <th className="px-4 py-2 text-left border-b">Price</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((property) => (
                <tr key={property._id}>
                  <td className="px-4 py-2 border-b">{property.title}</td>
                  <td className="px-4 py-2 border-b">{property.location}</td>
                  <td className="px-4 py-2 border-b">${parseFloat(property.offerAmount || 0).toFixed(2)}</td>
                  <td className="px-4 py-2 border-b">{property.status}</td>
                  <td className="px-4 py-2 border-b">{property.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SoldProperty;
