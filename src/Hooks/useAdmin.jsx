import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiossecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email?.toLowerCase(), 'isAdmin'],
    enabled: !!user?.email && !loading, 
    queryFn: async () => {
      const emailLower = user.email.toLowerCase(); 
      const res = await axiossecure.get(`/users/adminuser/${emailLower}`);
      console.log(res.data); 
      return res.data?.admin; 
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;


