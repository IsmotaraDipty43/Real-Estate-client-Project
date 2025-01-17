import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useLoadUserdata = () => {
  const [isAgent, setIsAgent] = useState(false); 
  const secureAxios = useAxiosSecure(); 
  const { user } = useAuth(); 
  const { data, error, isLoading } = useQuery({
    queryKey: ["userData"], 
    queryFn: async () => {
      const response = await secureAxios.get("/users"); 
      return response.data;
    },
  });

  useEffect(() => {
    if (user?.email && data) {
      // Check if the logged-in user's email matches a database user's email with the role 'Agent' (case-insensitive)
      const loggedInUser = data.find(
        (dbUser) =>
          dbUser.email.toLowerCase() === user.email.toLowerCase() &&
          dbUser.role === "Agent" || dbUser.role === "Fraud"
      );
      setIsAgent(!!loggedInUser); // Set isAgent to true if found, else false
    }
  }, [user, data]); // Only run when user or data changes
  

  console.log("Logged-in User's Email:", user?.email);
  console.log("Is Agent:", isAgent);

  return {
    data,       // The user data
    isAgent,    // Boolean indicating if the logged-in user is an agent
    isLoading,  // Loading state
    error,      // Error state
  };
};

export default useLoadUserdata;
