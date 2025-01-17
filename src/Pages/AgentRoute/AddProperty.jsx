import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
console.log(user.email);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axiosSecure.get(`/specificuser/${user.email}`);
        
        if (response.data.role === 'Fraud') {
          setUserRole('Fraud');
   
        } else {
          setUserRole('Valid');
        }
      } 
      
      catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('Valid');
      }
    };
    fetchUserRole();
  }, [user.email, axiosSecure]);
 

  console.log(userRole);
  const onSubmit = async (data) => {
    const { title, location, minimumPrice, maximumPrice, image, description, agentImage } = data;

   
    if (userRole === 'Fraud') {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You are marked as Fraud and cannot add properties.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (Number(minimumPrice) >= Number(maximumPrice)) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Minimum price must be less than maximum price',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const propertyImageFile = { image: image[0] };
    const agentImageFile = { image: agentImage[0] };

    try {
      const propertyImageResponse = await axiosPublic.post(image_hosting_api, propertyImageFile, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      const agentImageResponse = await axiosPublic.post(image_hosting_api, agentImageFile, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      if (propertyImageResponse.data.success && agentImageResponse.data.success) {
    
        const propertyData = {
          title,
          location,
          priceRange: {
            minimumPrice: Number(minimumPrice),
            maximumPrice: Number(maximumPrice),
          },
          image: propertyImageResponse.data.data.display_url,
          agentName: user.displayName,
          agentEmail: user.email,
          description,
          agentImage: agentImageResponse.data.data.display_url,
        };

    
        const propertyResponse = await axiosSecure.post('/properties', propertyData);

        if (propertyResponse.data.insertedId) {
          reset(); 
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${title} has been added successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error('Error adding property:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to add property',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-5">Add New Property</h2>
      <div className="w-full p-5">
        <div className="bg-gray-100 mt-10 mb-10 p-8 rounded-lg shadow-lg">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Property Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Title*</label>
              <input
                name="title"
                {...register('title', { required: true })}
                placeholder="Enter property title"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Location*</label>
              <input
                name="location"
                {...register('location', { required: true })}
                placeholder="Enter property location"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Range */}
            <div className="flex gap-5">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Minimum Price*</label>
                <input
                  name="minimumPrice"
                  {...register('minimumPrice', { required: true })}
                  placeholder="Enter minimum price"
                  required
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Maximum Price*</label>
                <input
                  name="maximumPrice"
                  {...register('maximumPrice', { required: true })}
                  placeholder="Enter maximum price"
                  required
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Agent Info */}
            <div className="flex gap-5">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Agent Name*</label>
                <input
                  name="agentName"
                  defaultValue={user.displayName}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Agent Email*</label>
                <input
                  name="agentEmail"
                  defaultValue={user.email}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Property Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description*</label>
              <textarea
                name="description"
                {...register('description', { required: true })}
                placeholder="Enter property description"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Property Image */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Image*</label>
              <input
                type="file"
                {...register('image', { required: true })}
                required
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            {/* Agent Image */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Agent Image*</label>
              <input
                type="file"
                {...register('agentImage', { required: true })}
                required
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-gray-900 text-white font-semibold py-3 rounded-lg"
            >
              Add Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
