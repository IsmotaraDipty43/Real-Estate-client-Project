import React from "react";
import house1 from '../assets/house1.png'
import house2 from '../assets/house2.png'
import house3 from '../assets/house3.png'

const Services = () => {
  return (
    <div className="conatiner mx-auto px-5  py-12">
      <h2 className="text-center text-blue-600 font-bold text-sm uppercase">
        Our Services
      </h2>
      <h1 className="text-center text-3xl font-bold mb-8">What We Do?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service 1 */}
        <div className="shadow-lg rounded-lg p-6 bg-white text-center border">
          <img
            src={house1}
            alt="Buy A New Home"
            className="mx-auto mb-4 w-24 h-24"
          />
          <h3 className="text-xl font-bold mb-2">Buy A New Home</h3>
          <p className="text-gray-600 mb-4">
            Discover your dream home effortlessly. Explore diverse properties
            and expert guidance for a seamless buying experience.
          </p>
          <button className="text-blue-500 font-medium flex items-center justify-center hover:underline">
            Learn More <span className="ml-1">→</span>
          </button>
        </div>

        {/* Service 2 */}
        <div className="shadow-lg rounded-lg p-6 bg-white text-center border">
          <img
            src={house2} 
            alt="Sell A Home"
            className="mx-auto mb-4 w-24 h-24"
          />
          <h3 className="text-xl font-bold mb-2">Sell A Home</h3>
          <p className="text-gray-600 mb-4">
            Sell confidently with expert guidance and effective strategies,
            showcasing your property's best features for a successful sale of a home.
          </p>
          <button className="text-blue-500 font-medium flex items-center justify-center hover:underline">
            Learn More <span className="ml-1">→</span>
          </button>
        </div>

        {/* Service 3 */}
        <div className="shadow-lg rounded-lg p-6 bg-white text-center border">
          <img
            src={house3}
            alt="Rent A Home"
            className="mx-auto mb-4 w-24 h-24"
          />
          <h3 className="text-xl font-bold mb-2">Rent A Home</h3>
          <p className="text-gray-600 mb-4">
            Discover your perfect rental effortlessly. Explore a diverse variety
            of listings tailored precisely to suit your unique lifestyle needs.
          </p>
          <button className="text-blue-500 font-medium flex items-center justify-center hover:underline">
            Learn More <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
