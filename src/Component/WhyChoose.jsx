import React from 'react';
import bedroom from '../assets/brdroom.jpg'
const WhyChoose = () => {
    return (
  <section className='container mx-auto'>
          <div className="flex flex-col  gap-6 lg:flex-row items-center justify-between px-5  py-12 ">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={bedroom} 
              alt="Beautiful living room"
              className="rounded-lg shadow-lg"
            />
          </div>
    
          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 text-left">
            <h3 className="text-blue-500 font-semibold text-sm uppercase mb-2">
              Our Benefit
            </h3>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Why Choose HomeScape
            </h2>
            <p className="text-gray-600 mb-6">
              Our seasoned team excels in real estate with years of successful
              market navigation, offering informed decisions and optimal results.
            </p>
    
            {/* Feature Cards */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <div className="text-blue-500 text-2xl">
                  <i className="fas fa-search"></i> 
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Proven Expertise</h4>
                  <p className="text-gray-600">
                    Our seasoned team excels in real estate with years of successful
                    market navigation, offering informed decisions and optimal
                    results.
                  </p>
                </div>
              </div>
    
              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <div className="text-blue-500 text-2xl">
                  <i className="fas fa-cogs"></i> 
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    Customized Solutions
                  </h4>
                  <p className="text-gray-600">
                    We pride ourselves on crafting personalized strategies to match
                    your unique goals, ensuring a seamless real estate journey.
                  </p>
                </div>
              </div>
    
              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <div className="text-blue-500 text-2xl">
                  <i className="fas fa-handshake"></i> 
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    Transparent Partnerships
                  </h4>
                  <p className="text-gray-600">
                    Transparency is key in our client relationships. We prioritize
                    clear communication and ethical practices, fostering trust and
                    reliability throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  </section>
      );
    };

export default WhyChoose;