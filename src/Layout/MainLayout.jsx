import React from 'react';
import Navber from '../Shared/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const MainLayout = () => {
    return (
        <div>
        <Navber></Navber>
      <div className=''>
      <Outlet></Outlet>
      </div>
      <Footer></Footer>
        </div>
    );
};

export default MainLayout;