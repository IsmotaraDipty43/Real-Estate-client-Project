import React from 'react';
import error from '../assets/error.jpg';

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Error Image */}
      <img src={error} alt="Error Icon" className=" mr-3" />
      
      {/* Error Message */}
      <span className="text-xl font-bold text-red-500">An error occurred. Please try again later.</span>
    </div>
  );
};

export default ErrorMessage;
