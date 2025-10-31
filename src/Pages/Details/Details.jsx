import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import useAuth from "../../Hooks/useAuth";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [estateData, setEstateData] = useState([]);
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setEstateData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (estateData.length > 0) {
      const foundEstate = estateData.find(
        (estate) => estate.id === parseInt(id)
      );
      setEstate(foundEstate);
    }
  }, [estateData, id]);

  const addToWishlist = () => {
    try {
      // Get existing wishlist from localStorage
      const wishlistKey = `wishlist_${user?.uid || 'guest'}`;
      const existingWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
      
      // Check if item is already in wishlist
      if (!existingWishlist.includes(estate.id)) {
        // Add item to wishlist
        const updatedWishlist = [...existingWishlist, estate.id];
        localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
        
        toast.success('Property added to wishlist!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.info('Property is already in your wishlist!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error('Failed to add property to wishlist.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!estate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn{`'`}t find the property you{`'`}re looking for. It may have been removed or the ID is incorrect.
          </p>
          <Link to="/">
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium rounded-lg transition shadow-lg">
              Browse Properties
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <button className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Properties
            </button>
          </Link>
        </div>

        {/* Property Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <img
              className="w-full h-64 md:h-96 object-cover"
              src={estate.image}
              alt={estate.estate_title}
            />
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                estate.status === 'sale' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {estate.status === 'sale' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{estate.estate_title}</h1>
              <p className="text-3xl font-bold text-emerald-600">{estate.price}</p>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{estate.location}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Property Type</p>
                <p className="font-semibold text-emerald-700">{estate.segment_name}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Area</p>
                <p className="font-semibold text-emerald-700">{estate.area}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">ID</p>
                <p className="font-semibold text-emerald-700">#{estate.id}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold text-emerald-700 capitalize">{estate.status}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium rounded-lg transition shadow-lg">
                  View Similar Properties
                </button>
              </Link>
              <button
                onClick={addToWishlist}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition shadow-lg flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Property Description</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {estate.description}
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Facilities & Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {estate.facilities.map((facility, index) => (
                <div key={index} className="flex items-center bg-emerald-50 rounded-lg p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-700">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Interested in this property?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Contact our real estate experts for more information or to schedule a viewing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg">
                Schedule a Viewing
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;