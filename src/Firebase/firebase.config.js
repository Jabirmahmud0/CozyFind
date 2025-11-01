import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXd5sLIk47XpRcFVgiTO-wY4w9bwuyPQ4",
  authDomain: "cozyfind-ef546.firebaseapp.com",
  projectId: "cozyfind-ef546",
  storageBucket: "cozyfind-ef546.firebasestorage.app",
  messagingSenderId: "753901361309",
  appId: "1:753901361309:web:7bc20364d41c07d6fb9c74",
  measurementId: "G-LQH2Z1Q17K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { app, analytics };
export default auth;