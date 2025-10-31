import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Details from "../Pages/Details/Details";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Notfound from "../Pages/NotFound/Notfound";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../ProtectedRoute/UserProfile";
import AllProperties from "../Pages/AllProperties/AllProperties";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-properties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/estate_details/:id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
      },
      {
        path: '/update-profile',
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: '/wishlist',
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
      },
    
      {
        path: '/user-profile',
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
      },
    ],
  },
]);

export default router;