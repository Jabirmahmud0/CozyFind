import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlX6LAaJbrt-C0wAAA_dD94mwUqi1NGz4",
  authDomain: "res-real-estate-auth.firebaseapp.com",
  projectId: "res-real-estate-auth",
  storageBucket: "res-real-estate-auth.appspot.com",
  messagingSenderId: "479474071788",
  appId: "1:479474071788:web:24170ae329ee6df163cdc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;