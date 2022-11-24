import { useState, createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const statsCollectionRef = collection(db, "stats");

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserDoc = (email) => {
    return addDoc(statsCollectionRef, { email: email, gamesPlayedNumber: 0 });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    createUser,
    user,
    logout,
    signIn,
    createUserDoc,
    statsCollectionRef,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
