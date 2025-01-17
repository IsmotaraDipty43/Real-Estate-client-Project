import { createContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile,

} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";

import useAxiosPublic from '../Hooks/useAxiosPublic'
// Create the AuthContext
export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()

    // States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleprovider = new GoogleAuthProvider();
    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign In
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
  
    const updateUserProfile = (name, photo) =>{
     return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })

    }

    const  googleSingin =()=>{
        setLoading(true)
        return signInWithPopup(auth, googleprovider)
    }


















    // Observe User State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                //get token and store client side
                const userInfo = { email : currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                });
            
            }
            
            
            
            else{
              localStorage.removeItem('access-token' )
              setLoading(false);
            }
    
        });

        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);

    // Context Value
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSingin,

    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
