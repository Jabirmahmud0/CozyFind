import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import useAuth from "../../Hooks/useAuth";

const AllProperties = () => {
  // State to store the fetched data
  const [estateData, setEstateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const { user } = useAuth();
  
  // Function to fetch data from the JSON file
  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      setEstateData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToWishlist = (id) => {
    try {
      // Get existing wishlist from localStorage
      const wishlistKey = `wishlist_${user?.uid || 'guest'}`;
      const existingWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
      
      // Check if item is already in wishlist
      if (!existingWishlist.includes(id)) {
        // Add item to wishlist
        const updatedWishlist = [...existingWishlist, id];
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

  // Filter data based on search term and filters
  useEffect(() => {
    let result = estateData;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(estate => 
        estate.estate_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estate.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(estate => estate.status === statusFilter);
    }
    
    // Apply segment filter
    if (segmentFilter !== "all") {
      result = result.filter(estate => estate.segment_name === segmentFilter);
    }
    
    setFilteredData(result);
  }, [searchTerm, statusFilter, segmentFilter, estateData]);

  // Get unique segment names for filter dropdown
  const segmentNames = [...new Set(estateData.map(item => item.segment_name))];

  return (
    <div className="py-8 px-4 md:px-8 lg:px-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">All Properties</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our complete collection of residential properties
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Properties
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, location, or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
          
          {/* Segment Filter */}
          <div>
            <label htmlFor="segment" className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              id="segment"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {segmentNames.map((segment, index) => (
                <option key={index} value={segment}>{segment}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredData.length}</span> of{" "}
            <span className="font-semibold">{estateData.length}</span> properties
          </p>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((estate) => (
            <div 
              key={estate.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  className="w-full h-56 object-cover"
                  src={estate.image}
                  alt={estate.estate_title}
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  estate.status === 'sale' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {estate.status === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{estate.estate_title}</h3>
                  <p className="text-lg font-bold text-emerald-600">{estate.price}</p>
                </div>
                
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {estate.location}
                </p>
                
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {estate.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    {estate.area}
                  </span>
                  <span className="text-gray-600">{estate.segment_name}</span>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Link to={`/estate_details/${estate.id}`}>
                    <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg transition-colors duration-300 font-medium">
                      View Details
                    </button>
                  </Link>
                  <button
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors duration-300 font-medium"
                    onClick={() => addToWishlist(estate.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No properties found message
        <div className="text-center py-12">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn{`'`}t find any properties matching your search criteria. Try adjusting your filters.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg transition-colors duration-300"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setSegmentFilter("all");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProperties;