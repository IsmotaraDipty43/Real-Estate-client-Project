import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const { propertyId } = useParams();
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Please enter your card details');
      setLoading(false);
      return;
    }

    try {
    
      const { data: offer } = await axiosSecure.get(`/getmyoffer/${propertyId}`);
      const amount = offer.offerAmount;


      const { data } = await axiosSecure.post('/create-payment-intent', { amount });
      const clientSecret = data.clientSecret;

  
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setLoading(false);
        return;
      }

      if (paymentResult.paymentIntent.status === 'succeeded') {
      
        await axiosSecure.patch(`/offer/payment/${propertyId}`, {
          transactionId: paymentResult.paymentIntent.id,
        });

        setTransactionId(paymentResult.paymentIntent.id);
    
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      {transactionId ? (
        <p className="text-green-600">
          Payment Successful! Transaction ID: <strong>{transactionId}</strong>
        </p>
      ) : (
        <form onSubmit={handlePayment}>
          <CardElement className="border p-2 rounded mb-4" />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </form>
      )}
    </div>
  );
};


export default PaymentForm;