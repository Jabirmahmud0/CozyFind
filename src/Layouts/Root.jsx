import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Navbar/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Pages/Footer/Footer";

import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;