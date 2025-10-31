import { NavLink, Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const { logout, user } = useAuth();

    return (
        <div className="navbar bg-gradient-to-r from-emerald-700 to-teal-800 text-white lg:px-24 md:px-16 sm:px-8 px-4 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gradient-to-r from-emerald-700 to-teal-800 rounded-box w-52 text-white">
                        <li>
                            <NavLink
                                exact
                                to="/"
                                className={({ isActive }) => 
                                    isActive 
                                        ? "font-bold bg-white/20 text-white" 
                                        : "text-white hover:bg-white/10"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink
                                    to="/update-profile"
                                    className={({ isActive }) => 
                                        isActive 
                                            ? "font-bold bg-white/20 text-white" 
                                            : "text-white hover:bg-white/10"
                                    }
                                >
                                    Update Profile
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li>
                                <NavLink
                                    to="/user-profile"
                                    className={({ isActive }) => 
                                        isActive 
                                            ? "font-bold bg-white/20 text-white" 
                                            : "text-white hover:bg-white/10"
                                    }
                                >
                                    User Profile
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink
                                to="/wishlist"
                                className={({ isActive }) => 
                                    isActive 
                                        ? "font-bold bg-white/20 text-white" 
                                        : "text-white hover:bg-white/10"
                                }
                            >
                                Wishlist
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <NavLink
                    to="/"
                    className="btn btn-ghost text-xl text-white normal-case text-2xl font-bold"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                        Cozy
                    </span>
                    <span className="text-white">Find</span>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    <li>
                        <NavLink
                            exact
                            to="/"
                            className={({ isActive }) => 
                                isActive 
                                    ? "font-bold bg-white/20 text-white rounded-lg" 
                                    : "text-white hover:bg-white/10 rounded-lg"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink
                                to="/update-profile"
                                className={({ isActive }) => 
                                    isActive 
                                        ? "font-bold bg-white/20 text-white rounded-lg" 
                                        : "text-white hover:bg-white/10 rounded-lg"
                                }
                            >
                                Update Profile
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <NavLink
                                to="/user-profile"
                                className={({ isActive }) => 
                                    isActive 
                                        ? "font-bold bg-white/20 text-white rounded-lg" 
                                        : "text-white hover:bg-white/10 rounded-lg"
                                }
                            >
                                User Profile
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) => 
                                isActive 
                                    ? "font-bold bg-white/20 text-white rounded-lg" 
                                    : "text-white hover:bg-white/10 rounded-lg"
                            }
                        >
                            Wishlist
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="flex items-center">
                    {user ? (
                        <>
                            <div className="avatar mr-3">
                                <div className="w-10 rounded-full ring-2 ring-white ring-offset-2 ring-offset-emerald-700">
                                    <img 
                                        src={user?.photoURL || user?.reloadUserInfo?.photoUrl || "https://i.ibb.co/QnGz7Yz/5.jpg"} 
                                        title={user?.displayName || user?.email || "User"} 
                                        alt="User Avatar" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://i.ibb.co/QnGz7Yz/5.jpg";
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="hidden md:block mr-3">
                                <p className="font-semibold">{user?.displayName || user?.email || "User"}</p>
                            </div>
                            <button 
                                onClick={logout} 
                                className="btn btn-ghost text-white hover:bg-white/10"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-ghost text-white hover:bg-white/10">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;