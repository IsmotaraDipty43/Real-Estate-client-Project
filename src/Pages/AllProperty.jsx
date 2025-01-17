import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import bgimg from "../assets/allproperty.jpg";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Loading from "../Component/Loading";

const AllProperty = () => {
  const secureAxios = useAxiosSecure(); 
  const { user } = useAuth();

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await secureAxios.get("/property");
      return response.data;
    },
  });
  const [searchLocation, setSearchLocation] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

 
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Failed to load properties. Please try again later.</div>;
  }

  const filteredProperties = properties?.filter((property) =>
    property.location.toLowerCase().includes(searchLocation.toLowerCase())
  );


  const sortedProperties = filteredProperties?.sort((a, b) => {
    const priceA =
      a.priceRange.minimumPrice + a.priceRange.maximumPrice / 2; 
    const priceB =
      b.priceRange.minimumPrice + b.priceRange.maximumPrice / 2; 
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  return (
    <section className="container mx-auto">
      <div
        style={{ backgroundImage: `url(${bgimg})` }}
        className="justify-center flex h-[700px] bg-cover bg-center items-center relative mb-10"
      >
        <div className="p-10 bg-black text-white bg-opacity-60 flex flex-col justify-center items-center absolute w-8/12 mx-auto ">
          <h1 className="text-4xl font-bold mb-4 text-center">
            All Properties Available for Sale
          </h1>
          <p className="text-lg text-center mb-6">
            Explore a wide range of properties added by our trusted real estate
            agents. Find the perfect property that suits your needs.
          </p>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center p-3 space-x-4">
          {/* Search by location */}
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex items-center p-3 space-x-4">
          {/* Sort by price */}
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {sortedProperties
          ?.filter((property) => property.verificationStatus !== "Rejected" && property.verificationStatus != null ) // Exclude rejected properties
          .map((property) => (
            <div
              key={property._id}
              className="border border-gray-300 rounded-lg shadow-lg p-4"
            >
              {/* Property Image */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Property Title */}
              <h3 className="text-xl font-bold mb-2">{property.title}</h3>

              {/* Property Location */}
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {property.location}
              </p>

              {/* Agent Details */}
              <div className="flex items-center mb-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <p>
                  <strong>Agent:</strong> {property.agentName}
                </p>
              </div>

              {/* Verification Status */}
              <p
                className={`mb-2 ${
                  property.verificationStatus === "Verified"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <strong>Status:</strong> {property.verificationStatus || "Pending"}
              </p>

              {/* Price Range */}
              <p className="text-gray-700 mb-4">
                <strong>Price Range:</strong> $
                {property.priceRange.minimumPrice} - $
                {property.priceRange.maximumPrice}
              </p>

              {/* Details Button */}
              <Link
                to={`/property/${property._id}`}
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Details
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AllProperty;
