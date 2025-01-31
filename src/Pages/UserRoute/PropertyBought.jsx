import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";



const PropertyBought = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 
  const [offers, setOffers] = useState([]); 
const navigate= useNavigate()
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        if (user?.email) {
          const response = await axiosSecure.get(`/myoffer/${user.email}`);
          setOffers(response.data); 
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [user, axiosSecure]); 

  const handlePayment = (propertyId) => {
    navigate(`/dashbroad/property-bought/payment/${propertyId}`);
  };
 
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Properties Bought</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.length === 0 && <p>You have not brought any property yet.</p>}

        {offers.map((offer) => (
          <div
            key={offer._id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <img
              src={offer.propertyImage} 
              alt={offer.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-semibold">{offer.title}</h3>
            <p className="text-gray-600">Location: {offer.location}</p>
            <p className="text-gray-600">Agent: {offer.agentName}</p>
            <p className="text-gray-600">Offered Amount: ${offer.offerAmount}</p>
            <p
              className={`text-lg font-medium mt-2 ${
                offer.status === "accepted"
                  ? "text-green-600"
                  : offer.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {offer.status}
            </p>
            {offer.status === "accepted" && (
     
          <button onClick={()=>handlePayment(offer.propertyId)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Pay
          </button>

        
            )}
              {offer.status === "bought" && (  <p className="text-red-500 text-lg sm:text-xs md:text-xs font-bold">TransationID  <br />{offer?.transactionId}</p>
       )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
