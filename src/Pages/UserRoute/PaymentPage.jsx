import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
;
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { propertyId } = useParams(); 
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 
  const [offer, setOffer] = useState(null); 


  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const { data } = await axiosSecure.get(`/getmyoffer/${propertyId}`);
        setOffer(data);
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };

    fetchOfferDetails();
  }, [propertyId, axiosSecure]);
 console.log(offer);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">Payment Page</h1>
      {offer ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
          <p><strong>Property Title:</strong> {offer.title}</p>
          <p><strong>Location:</strong> {offer.location}</p>
          <p><strong>Agent Name:</strong> {offer.agentName}</p>
          <p><strong>Offered Amount:</strong> ${offer.offerAmount}</p>
          <p><strong>Status:</strong> {offer.status}</p>

          {/* Wrap PaymentForm in the Elements provider */}
          <Elements stripe={stripePromise}>
            <PaymentForm
              offerAmount={offer.offerAmount}
              propertyId={propertyId}
              userEmail={user.email}
            />
          </Elements>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading offer details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
