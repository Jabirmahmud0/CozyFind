import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Wishlist = () => {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Load wishlist from localStorage on component mount
        const loadWishlist = () => {
            try {
                const savedWishlist = localStorage.getItem(`wishlist_${user?.uid || 'guest'}`);
                if (savedWishlist) {
                    setWishlist(JSON.parse(savedWishlist));
                }
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
        };

        loadWishlist();
    }, [user]);

    useEffect(() => {
        // Fetch property details for wishlist items
        const fetchWishlistItems = async () => {
            if (wishlist.length === 0) {
                setWishlistItems([]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/data.json');
                const allProperties = await response.json();
                
                // Filter properties that are in the wishlist
                const wishlistProperties = allProperties.filter(property => 
                    wishlist.includes(property.id)
                );
                
                setWishlistItems(wishlistProperties);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
                setWishlistItems([]);
            } finally {
                setLoading(false);
            }
        };

        if (wishlist.length > 0) {
            fetchWishlistItems();
        } else {
            setWishlistItems([]);
            setLoading(false);
        }
    }, [wishlist]);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter(itemId => itemId !== id);
        setWishlist(updatedWishlist);
        
        // Save to localStorage
        try {
            localStorage.setItem(`wishlist_${user?.uid || 'guest'}`, JSON.stringify(updatedWishlist));
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
        
        // Update displayed items
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your wishlist...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Wishlist</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Save your favorite properties and easily access them later
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                        <div className="mx-auto w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            You haven{`'`}t added any properties to your wishlist yet. Start exploring and save your favorites!
                        </p>
                        <Link to="/">
                            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-medium rounded-lg transition shadow-lg">
                                Browse Properties
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="relative">
                                    <img
                                        className="w-full h-56 object-cover"
                                        src={item.image}
                                        alt={item.estate_title}
                                    />
                                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                                        item.status === 'sale' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                                    }`}>
                                        {item.status === 'sale' ? 'For Sale' : 'For Rent'}
                                    </span>
                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition"
                                        title="Remove from wishlist"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800">{item.estate_title}</h3>
                                        <p className="text-lg font-bold text-emerald-600">{item.price}</p>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {item.location}
                                    </p>
                                    
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                            {item.area}
                                        </span>
                                        <span className="text-gray-600">{item.segment_name}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <Link to={`/estate_details/${item.id}`}>
                                            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg transition-colors duration-300 font-medium">
                                                View Details
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors duration-300 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;