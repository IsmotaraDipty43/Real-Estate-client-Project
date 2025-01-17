import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Component/Loading";

const UpdateProperty = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState({ minimumPrice: 0, maximumPrice: 0 }); 
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
  
    const fetchPropertyById = async () => {
      try {
        const response = await axiosSecure.get(`/property/${id}`);
        setProperty(response.data);
        setUpdatedPrice({
          minimumPrice: response.data.priceRange.minimumPrice,
          maximumPrice: response.data.priceRange.maximumPrice,
        });
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchPropertyById();
  }, [id, axiosSecure]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPrice((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProperty = {
        ...property,
        priceRange: updatedPrice,
      };
      const response = await axiosSecure.patch(`/property/${id}`, updatedProperty);

      if (response.data.modifiedCount > 0) {
        Swal.fire("Success!", "Property updated successfully.", "success");
       
      }
    } catch (error) {
      console.error("Error updating property:", error);
      Swal.fire("Error!", "Failed to update property.", "error");
    }
  };

  if (!property) return <p><Loading></Loading></p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Update Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">Property Image</label>
          <input
            type="text"
            name="image"
            value={property.image}
            onChange={handleInputChange}
            className="border w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-bold">Property Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleInputChange}
            className="border w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-bold">Property Location</label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleInputChange}
            className="border w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-bold">Agent Name</label>
          <input
            type="text"
            name="agentName"
            value={property.agentName}
            readOnly
            className="border w-full px-4 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-bold">Agent Email</label>
          <input
            type="text"
            name="agentEmail"
            value={property.agentEmail}
            readOnly
            className="border w-full px-4 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-bold">Minimum Price</label>
          <input
            type="number"
            name="minimumPrice"
            value={updatedPrice.minimumPrice}
            onChange={handlePriceChange}
            className="border w-full px-4 py-2"
          />
        </div>
        <div>
          <label className="block font-bold">Maximum Price</label>
          <input
            type="number"
            name="maximumPrice"
            value={updatedPrice.maximumPrice}
            onChange={handlePriceChange}
            className="border w-full px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
