import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Component/Loading";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";



const AdminRoute = ({children}) => {
   const [isAdmin, isAdminLoading] = useAdmin()
   const {user, loading} = useAuth()
   const location = useLocation()
   if(loading || isAdminLoading){
    return <Loading></Loading>
}
if(user && isAdmin){
    return children
}
return <Navigate to='/login'></Navigate>

};

export default AdminRoute;