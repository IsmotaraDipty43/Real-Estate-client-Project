import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyRequestedOfferedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [offers, setOffers] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosSecure.get(`/properties/${user.email}`);
        setProperties(response.data); 
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    if (user?.email) {
      fetchProperties();
    }
  }, [user.email, axiosSecure]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const propertyTitles = properties.map((prop) => prop.title);
        const allOffers = [];

        for (let title of propertyTitles) {
          const response = await axiosSecure.get(`/offer/${title}`);
          allOffers.push(...response.data); 
        }

        setOffers(allOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    if (properties.length > 0) {
      fetchOffers();
    }
  }, [properties, axiosSecure]);

  const handleStatusChange = async (offerId, status, propertyId) => {
    try {
      if (status === "accepted") {
    
        await axiosSecure.post(`/offers/update/${propertyId}`, {
          acceptedOfferId: offerId,
        });
      } else {
       
        await axiosSecure.patch(`/offer/status/${offerId}`, { status });
      }

   
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer._id === offerId
            ? { ...offer, status }
            : status === "accepted" && offer.propertyId === propertyId
            ? { ...offer, status: "rejected" }
            : offer
        )
      );
    } catch (error) {
      console.error(`Error updating offer status to ${status}:`, error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Requested/Offered Properties</h1>
      <div className="overflow-x-auto"> 
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Property Title</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
              <th className="border border-gray-300 px-4 py-2">Offered Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="border border-gray-300 px-4 py-2">{offer.title}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.location}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.buyerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.buyerName}</td>
                <td className="border border-gray-300 px-4 py-2">${offer.offerAmount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(offer._id, "accepted", offer.propertyId)
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(offer._id, "rejected")}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </>
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

export default MyRequestedOfferedProperties;
