import React from 'react';
import Bannerr from '../Component/Bannerr';
import AdvertisementSection from '../Component/AdvertisementSection';
import Services from '../Component/Services';
import WhyChoose from '../Component/WhyChoose';
import ReviewSection from '../Component/ReviewSection';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const { propertyId } = location.state || {}; 
    return (
        <div className='container mx-auto'>
    <Bannerr></Bannerr>
    <AdvertisementSection highlightedPropertyId={propertyId} /> 
    <Services></Services>
    <WhyChoose></WhyChoose>
    <ReviewSection></ReviewSection>
        </div>
    );
};

export default Home;