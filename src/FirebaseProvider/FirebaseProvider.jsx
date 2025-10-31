// Import necessary functions and dependencies
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext(null);

// Define the FirebaseProvider component
const FirebaseProvider = ({ children }) => {
    // Define state variables for user and loading state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Define Google and GitHub authentication providers
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // Define function to create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                setUser(newUser);
                setLoading(false);
                return newUser;
            })
            .catch(error => {
                console.error("Error creating user:", error);
                throw error;
            });
    }

    // Define function to update user profile
    const updateUserProfile = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
        .then(() => {
            setLoading(false);
            console.log("User profile updated");
        })
        .catch(error => {
            console.error("Error updating user profile:", error);
            throw error;
        });
    }

    // Define function to sign in user with email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const loggedInUser = userCredential.user;
                setUser(loggedInUser);
                setLoading(false);
                return loggedInUser;
            })
            .catch(error => {
                console.error("Error signing in:", error);
                throw error; 
            });
    }

    // Define function to sign in with GitHub
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
            .then((result) => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                setLoading(false);
                return loggedInUser;
            })
            .catch(error => {
                console.error("Error signing in with GitHub:", error);
                throw error; 
            });
    };

    // Define function to sign in with Google
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                setLoading(false);
                return loggedInUser;
            })
            .catch(error => {
                console.error("Error signing in with Google:", error);
                throw error; 
            });
    };

    // Define function to log out user
    const logout = () => {
        setUser(null);
        setLoading(true);
        return signOut(auth)
            .then(() => {
                setLoading(false);
                console.log("User logged out");
            })
            .catch(error => {
                console.error("Error signing out:", error);
                throw error;
            });
    }

    // UseEffect to observe authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    // Define the values to be provided in the AuthContext
    const allValues = {
        createUser,
        signInUser,
        githubLogin,
        googleLogin,
        logout,
        user,
        updateUserProfile,
        loading,
    };

    // Return the AuthContext provider with the defined values
    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;
