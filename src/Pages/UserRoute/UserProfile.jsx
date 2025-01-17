
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Component/Loading';


const UserProfile = () => {

  const { user } = useAuth(); // Get logged-in user from useAut
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Profile</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img 
            src={user.photoURL || 'default-profile.png'} 
            alt="User Profile" 
            className="w-16 h-16 rounded-full object-cover mr-4" 
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800"> Name: {user.displayName}</h2>
           
          </div>
        </div>

        {/* Conditionally render additional data if the user is not a regular user */}
    
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            <p className="text-gray-700">Email: {user.email}</p>
         
            {/* Add more information you want to display */}
          </div>
  
      </div>

    </div>
  );
};

export default UserProfile;