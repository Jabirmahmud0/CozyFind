import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Routes/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import FirebaseProvider from './FirebaseProvider/FirebaseProvider.jsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router}>
        <ToastContainer />
      </RouterProvider>
    </FirebaseProvider>
  </React.StrictMode>,
)