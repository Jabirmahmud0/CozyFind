import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import useAuth from "../../Hooks/useAuth";

const Home = () => {
  // State to store the fetched data
  const [estateData, setEstateData] = useState([]);
  const { user } = useAuth();
  
  // Function to fetch data from the JSON file
  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      setEstateData(data);
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

  return (
    <>
      {/* Hero Section */}
      <div className="mt-8 mb-12 text-center px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the perfect residential properties tailored to your lifestyle. Explore our curated collection of beautiful homes.
        </p>
      </div>

      {/* Image Carousel */}
      <div className="mb-16 px-4 md:px-8 lg:px-12">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper rounded-2xl overflow-hidden shadow-xl"
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="relative h-96 md:h-[500px]">
              <img
                className="w-full h-full object-cover"
                src="img/image1.jpg"
                alt="Luxury residential property"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-left text-white p-8 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Luxury Living</h2>
                  <p className="text-lg md:text-xl">
                    Experience premium comfort in our luxury residential properties with top-tier amenities.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="relative h-96 md:h-[500px]">
              <img
                className="w-full h-full object-cover"
                src="img/image2.jpg"
                alt="Family-friendly neighborhood"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-left text-white p-8 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Family-Friendly Spaces</h2>
                  <p className="text-lg md:text-xl">
                    Safe neighborhoods with excellent schools and recreational facilities for your family.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="relative h-96 md:h-[500px]">
              <img
                className="w-full h-full object-cover"
                src="img/image3.jpg"
                alt="Modern apartment complex"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-left text-white p-8 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Modern Amenities</h2>
                  <p className="text-lg md:text-xl">
                    Contemporary designs with smart home features and energy-efficient appliances.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="relative h-96 md:h-[500px]">
              <img
                className="w-full h-full object-cover"
                src="img/image4.jpg"
                alt="Scenic countryside property"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-left text-white p-8 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Natural Surroundings</h2>
                  <p className="text-lg md:text-xl">
                    Tranquil settings with beautiful landscapes and fresh air for a peaceful lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div className="relative h-96 md:h-[500px]">
              <img
                className="w-full h-full object-cover"
                src="img/image5.jpg"
                alt="Urban downtown living"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="text-left text-white p-8 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">City Convenience</h2>
                  <p className="text-lg md:text-xl">
                    Urban living with easy access to business districts, entertainment, and dining options.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Featured Properties Section */}
      <div className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium residential properties
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {estateData.slice(0, 6).map((estate) => (
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
        
        <div className="text-center mt-12">
          <Link to="/all-properties">
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg transition-colors duration-300 font-medium text-lg">
              View All Properties
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;