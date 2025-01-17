import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(`/myreview/${user.email}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (user) {
      fetchReviews();
    }
  }, [user, axiosSecure]);


  const deleteReview = async (id) => {
    try {
      const response = await axiosSecure.delete(`/myreview/${id}`);
      if (response.data.message === "Review deleted successfully") {
        setReviews(reviews.filter((review) => review._id !== id));
        Swal.fire({
          icon: "success",
          title: "Review Deleted",
          text: "Your review has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Delete Review",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">My Reviews</h1>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border border-gray-300 p-4 rounded-md mb-4">
            <h2 className="text-xl font-bold">{review.propertyTitle}</h2>
            <p className="text-lg">Agent: {review.agentName}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdReviewTime).toLocaleDateString()}
            </p>
            <p className="mt-2">{review.reviewDescription}</p>
            <button
              onClick={() => deleteReview(review._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Delete Review
            </button>
          </div>
        ))
      ) : (
        <p>You haven't added any reviews yet.</p>
      )}
    </div>
  );
};

export default MyReviews;
