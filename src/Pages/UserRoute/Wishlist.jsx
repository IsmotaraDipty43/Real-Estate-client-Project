import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Component/Loading';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
const navigate = useNavigate()
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosSecure.get(`/wishlist/${user.email}`);
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchWishlist();
    }
  }, [axiosSecure, user]);

  const handleMakeOffer = (propertyId) => {
    navigate(`/dashbroad/wishlist/make-offer/${propertyId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">No properties in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((property) => (
            <div key={property.propertyId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{property.title}</h2>
                <p className="text-sm text-gray-600">{property.location}</p>
                <div className="flex items-center my-3">
                  <img
                    src={property.agentImage}
                    alt={property.agentName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{property.agentName}</p>
                    <p className={`text-xs font-semibold ${property.verificationStatus === 'Verified' ? 'text-green-500' : 'text-red-500'}`}>
                      {property.verificationStatus}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 font-semibold">Price: {property.priceRange}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                    onClick={() => handleMakeOffer(property.propertyId)}
                  >
                    Make an Offer
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => console.log('Remove property with ID:', property.propertyId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
