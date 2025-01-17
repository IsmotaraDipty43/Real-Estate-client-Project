import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";

const MyAddedProperty = () => {
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
  const [users, setUsers] = useState([]); 




  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("User Email:", user.email); 
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

  const getUser = async () => {
    try {
      const response = await axiosSecure.get("/users");
      setUsers(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  useEffect(() => {
    getUser();
  }, []);
  





  

  const handleDelete = async (id) => {
    // SweetAlert confirmation
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/properties/${id}`);
        if (res.data.success) {
          setProperties(properties.filter((property) => property._id !== id)); 
          Swal.fire('Deleted!', 'Your property has been deleted.', 'success'); 
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        Swal.fire('Error!', 'There was a problem deleting the property.', 'error'); 
      }
    }
  };
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Added Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          properties.map((property) => (
            <div key={property._id} className="border rounded-lg shadow p-4 bg-white">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-sm text-gray-500">
                Agent: {property.agentName}
              </p>
              {/* Use user.photoURL as agent image */}
              <img
                src={user.photoURL || "default-agent-image.jpg"}  
                alt={property.agentName}
                className="w-12 h-12 rounded-full mt-2"
              />
              <p
                className={`text-sm font-bold mt-2 ${
                  property.verificationStatus === "Verified"
                    ? "text-green-500"
                    : property.verificationStatus === "Rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {property?.verificationStatus || 'Pending'}
              </p>
              <div className="text-sm mt-2">
                <p>
                  <span className="font-bold">Price Range: </span> ${property.priceRange.minimumPrice} - ${property.priceRange.maximumPrice}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                {property.verificationStatus !== "Rejected" && (
                  <NavLink to={`update-property/${property._id}`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Update
                    </button>
                  </NavLink>
                )}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAddedProperty;
