import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';  

const ManageReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
 
    axiosSecure.get('/reviews')
      .then(response => {
        setReviews(response.data); 
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [axiosSecure]);

  const handleDeleteReview = (reviewId, userEmail) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/reviews/${reviewId}`)
          .then(() => {
      
            setReviews(reviews.filter(review => review._id !== reviewId));

       
            Swal.fire(
              'Deleted!',
              'The review has been deleted.',
              'success'
            );

      
            axiosSecure.delete(`/users/reviews/${userEmail}`)
              .then(() => {
          
              })
              .catch(err => {
                console.error('Error removing review from user:', err);
              });
          })
          .catch(error => {
            Swal.fire(
              'Error!',
              'There was an issue deleting the review.',
              'error'
            );
            console.error('Error:', error);
          });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Manage Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <img 
                src={review.reviewerImage || '/default-avatar.png'} 
                alt={review.reviewerName} 
                className="w-12 h-12 rounded-full object-cover" 
              />
              <div>
                <h3 className="font-semibold text-gray-800">{review.reviewerName}</h3>
                <p className="text-gray-500">{review.reviewerEmail}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{review.reviewDescription}</p>
            <p className="mt-2 text-sm text-gray-500">Property: {review.propertyTitle}</p>
            <p className="text-sm text-gray-400">Reviewed on: {new Date(review.createdReviewTime).toLocaleDateString()}</p>
            <button
              onClick={() => handleDeleteReview(review._id, review.reviewerEmail)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviewsAdmin;
