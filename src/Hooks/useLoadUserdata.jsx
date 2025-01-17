import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

// Custom hook to load user data and check if the logged-in user is an agent
const useLoadUserdata = () => {
  const [isAgent, setIsAgent] = useState(false); // State to store if the user is an agent
  const secureAxios = useAxiosSecure(); // Get the secure axios instance
  const { user } = useAuth(); // Get logged-in user info from auth context

  // Fetch user data using Tanstack Query (React Query v5)
  const { data, error, isLoading } = useQuery({
    queryKey: ["userData"], // The query key to cache data
    queryFn: async () => {
      const response = await secureAxios.get("/users"); // Replace with your actual endpoint
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
