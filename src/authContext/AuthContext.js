import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userDocId, setUserDocId] = useState("");
  const [userData, setUserData] = useState({});

  const statsCollectionRef = collection(db, "stats");

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserDoc = (email) => {
    return addDoc(statsCollectionRef, {
      email: email,
      gamesStarted: 0,
      gamesWon: 0,
      gamesEnded: 0,
      gamesLost: 0,
      categories: [],
      lifelinesUsed: 0
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const getUserDoc = useCallback((user) => {
    if (user && user.email) {
      const getCurrentData = async () => {
        const q = query(statsCollectionRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDocId(doc.id);
          setUserData(doc.data());
        });
      };
      getCurrentData();
    }
    // eslint-disable-next-line
  }, []);

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
    getUserDoc,
    userDocId,
    userData,
    setUserDocId,
    setUserData
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
