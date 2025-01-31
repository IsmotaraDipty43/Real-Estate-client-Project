import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Component/Loading';

const MakeOffer = () => {
  const { propertyId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosSecure.get(`/allwishlist`);
        const propertyDetails = response.data.find((item) => item.propertyId === propertyId);
        setProperty(propertyDetails);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchProperty();
  }, [axiosSecure, propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [minPrice, maxPrice] = property.priceRange.split(' - ').map(Number);

    if (offerAmount < minPrice || offerAmount > maxPrice) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Offer',
        text: `Your offer must be between ${minPrice} and ${maxPrice}.`,
      });
      return;
    }

    const offerData = {
      propertyId: property.propertyId,
      propertyImage: property.image,
      title: property.title,
      location: property.location,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      buyerEmail: user.email,
      buyerName: user.displayName,
      offerAmount,
      buyingDate: new Date().toISOString(),
      status: 'pending',
    };

    try {
      await axiosSecure.post('/offers', offerData);
      Swal.fire({
        icon: 'success',
        title: 'Offer Submitted!',
        text: 'Your offer has been sent to the agent.',
      });
   
    } catch (error) {
      console.error('Error submitting offer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error submitting your offer. Please try again.',
      });
    }
  };

  if (!property) {
    return <p><Loading></Loading></p>;
  }

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Make an Offer</h1>
      <form className="bg-white p-6 rounded-md shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Property Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Your Offer Amount</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
