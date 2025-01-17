import React, { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md'; 
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Link } from 'react-router-dom';

const AdvertisementSection = ({ highlightedPropertyId }) => {
  const [properties, setProperties] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const axiosPublic = useAxiosPublic();

  
  useEffect(() => {
    axiosPublic
      .get('/property')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the properties!', error);
      });
  }, []);


  useEffect(() => {
    if (highlightedPropertyId && properties.length > 0) {
      const propertyExists = properties.find((property) => property._id === highlightedPropertyId);
  
      if (propertyExists) {
        setHighlighted(highlightedPropertyId);
  
        const timer = setTimeout(() => {
          setHighlighted(null);
        }, 5000); 
  
        return () => clearTimeout(timer); 
      } else {
        toast.error('Here only 4 properties are shown. Visit the All Property Page for more!');
      }
    }
  }, [highlightedPropertyId, properties]);
  

  return (
    <div className="mt-10 px-5 mb-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Discover Your Dream Property</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.slice(0, 4).map((property, index) => {
          
          const isHighlighted = property._id === highlighted;

          return (
            <div
              key={index}
              className={`property-card bg-white border shadow-lg rounded-lg overflow-hidden ${isHighlighted ? 'border-4 border-blue-500' : ''}`}
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-green-600 font-bold">
                    ${property.priceRange.minimumPrice.toLocaleString()} - $ 
                    {property.priceRange.maximumPrice.toLocaleString()}
                  </span>
                  <span
                    className={`flex items-center text-sm ${property.verificationStatus === 'Verified' ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    {property.verificationStatus === 'Verified' && (
                      <MdVerified className="mr-1 text-blue-500" />
                    )}
                    {property.verificationStatus}
                  </span>
                </div>
              <Link to={`/property/${property._id}`}>  <button
        
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        View Details
      </button></Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add ToastContainer here */}
      <ToastContainer />
    </div>
  );
};

export default AdvertisementSection;
