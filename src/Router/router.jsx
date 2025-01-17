import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Dashbroad from "../Pages/Dashbroad";
import Private from "./Private";
import AdminPropertymanage from "../Pages/AdminPropertymanage";
import ProfileofAdmin from "../Pages/ProfileofAdmin";
import ManageUsers from "../Pages/ManageUsers";
import ManageReviewsAdmin from "../Pages/ManageReviewsAdmin";
import AgentProfile from "../Pages/AgentRoute/AgentProfile";
import AddProperty from "../Pages/AgentRoute/AddProperty";
import MyAddedProperty from "../Pages/AgentRoute/MyAddedProperty";
import UpdateProperty from "../Pages/AgentRoute/UpdateProperty";
import UserProfile from "../Pages/UserRoute/UserProfile";
import AllProperty from "../Pages/AllProperty";
import PropertyDetails from "../Pages/PropertyDetails";
import Wishlist from "../Pages/UserRoute/Wishlist";
import MakeOffer from "../Pages/UserRoute/MakeOffer ";
import MyReviews from "../Pages/UserRoute/MyReviews";
import MyRequestedOfferedProperties from "../Pages/AgentRoute/MyRequestedOfferedProperties";
import PropertyBought from "../Pages/UserRoute/PropertyBought";

import PaymentPage from "../Pages/UserRoute/PaymentPage";
import SoldProperty from "../Pages/AgentRoute/SoldProperty";
import Advertiseproperty from "../Pages/Advertiseproperty";
import AdminRoute from "./AdminRoute";
import ErrorMessage from "../Component/ErrorMessage";







const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorMessage></ErrorMessage>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/reg',
          element:<Signup></Signup>
        },
        {
          path:'/allProperty',
          element:<Private><AllProperty></AllProperty></Private>
        },
        {
          path:'/property/:id',
          element:<Private><PropertyDetails></PropertyDetails></Private>
        }
      
      ]
      
    },
    {
      path:'/dashbroad',
      element:<Private><Dashbroad></Dashbroad></Private>,
      children:[
        //admin Route
        {
          path:'profile',
          element:<AdminRoute><ProfileofAdmin></ProfileofAdmin></AdminRoute>
        },
        {
          path:'manage-properties',
          element:<AdminRoute><AdminPropertymanage></AdminPropertymanage></AdminRoute>
        },
        {
          path:'manage-users',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'manage-reviews',
          element:<AdminRoute><ManageReviewsAdmin></ManageReviewsAdmin></AdminRoute>
        },
        {
          path:'sold-properties',
          element:<Private><SoldProperty></SoldProperty></Private>
        },
        {
          path:'Advertiseproperty',
          element:<AdminRoute><Advertiseproperty></Advertiseproperty></AdminRoute>
        },

        //agent routes
        {
          path:'agent-profile',
          element:<Private><AgentProfile></AgentProfile></Private>
        },
        {
          path:'add-property',
          element:<Private><AddProperty></AddProperty></Private>
        },
        {
          path:'my-properties',
          element:<Private><MyAddedProperty></MyAddedProperty></Private>
        },
        {
               path:'requested-properties',
               element:<Private><MyRequestedOfferedProperties></MyRequestedOfferedProperties></Private>
        },
       
        {
          path:'/dashbroad/my-properties/update-property/:id',
          element:<Private> <UpdateProperty></UpdateProperty></Private>
        },

        //user route
        {
          path:'my-profile',
          element:<Private><UserProfile></UserProfile></Private>
        },
        {
          path: 'my-reviews',
          element:<Private><MyReviews></MyReviews></Private>
        },
        {
          path:'wishlist',
          element:<Private><Wishlist></Wishlist></Private>
        },
        {
          path:'/dashbroad/wishlist/make-offer/:propertyId',
          element: <Private><MakeOffer></MakeOffer></Private>
        },
        {
          path:'property-bought',
          element:<Private><PropertyBought></PropertyBought></Private>
        },
        {
          path:'/dashbroad/property-bought/payment/:propertyId',
          element:<Private> <PaymentPage></PaymentPage></Private>
        },
       
    

        
        
      ]
    },

  
   
  ]);




export default router;