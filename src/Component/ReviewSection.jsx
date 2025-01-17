import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
  
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get('/reviews'); 
    
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.createdReviewTime) - new Date(a.createdReviewTime)
        );
        setReviews(sortedReviews.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [axiosPublic]); 


  const cardColors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100'];

  return (
    <div className="reviews-section container mx-auto my-8 p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest User Reviews</h2>

      {/* Flex container to make the reviews responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`review-item shadow-lg rounded-lg p-6 ${cardColors[index] || 'bg-white'}`}
          >
            <div className="flex items-center mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="reviewer-image rounded-full w-16 h-16 object-cover mr-4"
              />
              <div>
                <strong className="text-xl font-semibold">{review.reviewerName}</strong>
                <p className="text-sm text-gray-600">{new Date(review.createdReviewTime).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-gray-800 text-base italic">"{review.reviewDescription}"</p>
            <p className="mt-2 text-sm text-gray-500">Property Name: <strong>{review.propertyTitle}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
