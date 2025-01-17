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
     
      const loggedInUser = data.find(
        (dbUser) =>
          dbUser.email.toLowerCase() === user.email.toLowerCase() &&
          dbUser.role === "Agent" || dbUser.role === "Fraud"
      );
      setIsAgent(!!loggedInUser);
    }
  }, [user, data]); 
  

  console.log("Logged-in User's Email:", user?.email);
  console.log("Is Agent:", isAgent);

  return {
    data,     
    isAgent,    
    isLoading,  
    error,      
  };
};

export default useLoadUserdata;
