import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../Component/Loading";
import bgimg from '../assets/penthhouse.jpg'
import useAdmin from "../Hooks/useAdmin";
import useLoadUserdata from "../Hooks/useLoadUserdata";

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from the URL
  const [property, setProperty] = useState(null); // State for property details
  const [reviews, setReviews] = useState([]); // State for reviews
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [newReview, setNewReview] = useState(""); // New review input
  const [showReviewModal, setShowReviewModal] = useState(false); // Modal visibility
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // Get the secure axios instance
  const [isAdmin] = useAdmin();
  const { isAgent } = useLoadUserdata(); // Destructure isAgent from useLoadUserdata hook

  // Fetch property details and reviews
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const propertyResponse = await axiosSecure.get(`/property/${id}`);
        setProperty(propertyResponse.data);

        const reviewsResponse = await axiosSecure.get(
          `/reviews/${propertyResponse.data.title}`
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching property details or reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, axiosSecure]);

  // Add property to wishlist
  const addToWishlist = async () => {
    if (isAdmin || isAgent) {
      Swal.fire({
        icon: "warning",
        title: "Action Denied",
        text: "Admins and agents cannot add to wishlist.",
        confirmButtonColor: "#d33",
      });
      return;
    }
    

    try {
      // Prepare property data
      const wishlistData = {
        propertyId: property._id,
        title: property.title,
        image: property.image,
        location: property.location,
        agentName: property.agentName,
        agentImage: property.agentImage,
        agentEmail: property.agentEmail,
        verificationStatus: property.verificationStatus,
        priceRange: `${property.priceRange.minimumPrice} - ${property.priceRange.maximumPrice}`,
        userEmail: user.email,
      };

      // Send data to wishlist API
      await axiosSecure.post("/wishlist", wishlistData);

      // SweetAlert Success Message
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);

      // SweetAlert Error Message
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const addReview = async () => {
    if (isAdmin || isAgent) {
      Swal.fire({
        icon: "warning",
        title: "Action Denied",
        text: "Admins and agents cannot add reviews.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const reviewData = {
        reviewerEmail: user.email,  // Ensure this is sent from frontend
        propertyTitle: property.title,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        reviewDescription: newReview,  // This is the review content sent from the user
        createdReviewTime: new Date().toISOString(),
        agentName:property.agentName,
      };
      

      await axiosSecure.post("/reviews", reviewData); // Sending the review data to the backend

      // Update the local state with the new review
      setReviews([...reviews, reviewData]);
      setNewReview("");
      setShowReviewModal(false);

      // SweetAlert Success Message
      Swal.fire({
        icon: "success",
        title: "Review Added",
        text: "Your review has been added successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error adding review:", error);

      // SweetAlert Error Message
      Swal.fire({
        icon: "error",
        title: "Failed to Add Review",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (!property) {
    return <div>Property not found!</div>;
  }

  return (
    <div className="container mx-auto">
      <div 
        style={{ backgroundImage: `url(${bgimg})` }} 
        className="justify-center flex h-[700px] bg-cover bg-center items-center relative mb-10"
      >
        <div className="p-10 bg-black text-white bg-opacity-60 flex flex-col justify-center items-center absolute w-8/12 mx-auto ">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Detailed Property Information
          </h1>
          <p className="text-lg text-center mb-6">
            {`Discover detailed information about ${property?.title || "this property"}.`}
          </p>
        </div>
      </div>

     <div className="p-5">
       {/* Property Details Section */}
       <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
      <p className="text-lg mb-4">{property.description}</p>
      <p className="text-xl font-bold mb-4">
        Price Range: ${property.priceRange.minimumPrice} - $
        {property.priceRange.maximumPrice}
      </p>
      <p className="text-lg mb-4">
        <strong>Agent Name:</strong> {property.agentName}
      </p>
      <img
        src={property.image}
        alt={property.title}
        className="w-full  h-[700px]  mb-6 rounded-lg"
      />

      {/* Wishlist Button */}
      <button
        className="bg-purple-500 text-white py-2 px-4 rounded-md"
        onClick={addToWishlist}
    
      >
        Add to Wishlist
      </button>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md mb-4 flex items-start gap-4"
            >
              {/* Reviewer Image */}
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-16 h-16 rounded-full object-cover"
              />

              {/* Review Details */}
              <div className="flex-1">
                {/* Reviewer Name */}
                <h3 className="text-lg font-bold">{review.reviewerName}</h3>

                {/* Review Description */}
                <p className="text-gray-700 mt-2">{review.reviewDescription}</p>

                {/* Review Date */}
                <p className="text-sm text-gray-500 mt-4">
                  {new Date(review.createdReviewTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this property!</p>
        )}

        {/* Add Review Button */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4 mb-10"
          onClick={() => setShowReviewModal(true)}
      
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a Review</h2>

            {/* Reviewer Name */}
            <input
              type="text"
              value={user.displayName || "Anonymous"} // Fallback for anonymous users
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Your Name"
            />

            <input
              type="text"
              value={user.email || "Anonymous"}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Your Email"
            />

            {/* Review Textarea */}
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Write your review here..."
            />

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={addReview}
            >
              Submit Review
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-2 ml-4"
              onClick={() => setShowReviewModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
     </div>

    </div>
  );
};

export default PropertyDetails;
