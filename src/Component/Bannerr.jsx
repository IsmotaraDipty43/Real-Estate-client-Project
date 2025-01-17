import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';

const Bannerr = () => {
    return (
        <div className="">
            <Carousel
                autoPlay
                infiniteLoop
                interval={3000}
                stopOnHover={true}
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
                className="carousel-container"
            >
                <div>
                    <img
                        src={image4}
                        alt="Slide 1"
                      className="object-cover h-[500px] md:h-[800px] w-full"
                    />
                </div>
                <div>
                    <img
                        src={image3}
                        alt="Slide 2"
                      className="object-cover  h-[500px] md:h-[800px] w-full"
                    />
                </div>
                <div>
                    <img
                        src={image1}
                        alt="Slide 3"
                          className="object-cover  h-[500px] md:h-[800px] w-full"
                    />
                </div>
                <div>
                    <img
                        src={image2}
                        alt="Slide 4"
                        className="object-cover  h-[500px] md:h-[800px] w-full"
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Bannerr;
