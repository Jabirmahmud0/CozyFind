import { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-8 px-8">
            <h1 className="text-3xl font-bold text-white text-center">User Profile</h1>
          </div>
          
          <div className="py-10 px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={user?.photoURL || "https://i.ibb.co/QnGz7Yz/5.jpg"} 
                      alt="User Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow w-full">
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-1/3">
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:ml-4 sm:w-2/3">
                        <p className="text-lg font-medium text-gray-900">{user?.displayName || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-1/3">
                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:ml-4 sm:w-2/3">
                        <p className="text-lg font-medium text-gray-900">{user?.email || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-1/3">
                        <label className="text-sm font-medium text-gray-500">Account Status</label>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:ml-4 sm:w-2/3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-1/3">
                        <label className="text-sm font-medium text-gray-500">Member Since</label>
                      </div>
                      <div className="mt-1 sm:mt-0 sm:ml-4 sm:w-2/3">
                        <p className="text-lg font-medium text-gray-900">
                          {user?.metadata?.creationTime 
                            ? new Date(user.metadata.creationTime).toLocaleDateString() 
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <button 
                    onClick={() => window.location.href = '/update-profile'}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium rounded-lg transition shadow-md"
                  >
                    Edit Profile
                  </button>
                  
                  <button 
                    onClick={() => window.location.href = '/wishlist'}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition shadow-md"
                  >
                    View Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;