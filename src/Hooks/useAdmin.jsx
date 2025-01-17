import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiossecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email?.toLowerCase(), 'isAdmin'], // Convert email to lowercase for the query key
    enabled: !!user?.email && !loading, // Ensure email exists and loading is complete
    queryFn: async () => {
      const emailLower = user.email.toLowerCase(); // Convert email to lowercase
      const res = await axiossecure.get(`/users/adminuser/${emailLower}`);
      console.log(res.data); // Check the response data
      return res.data?.admin; // Return whether the user is an admin
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;


