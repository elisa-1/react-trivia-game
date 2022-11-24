import { useState, useEffect } from "react";
import { query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../authContext/AuthContext";
import styles from "./GameStats.module.css";

const GameStats = () => {
  const { user, statsCollectionRef } = UserAuth();

  const [userDocId, setUserDocId] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    localStorage.clear();

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
  }, [user]);

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game-stats"]}`}
    >
      <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled p-4">
        <li>{userDocId}</li>
        <li>Number of games played:  {userData.gamesPlayedNumber}</li>
        <li>Number of 1,000,000$ won: </li>
        <br />
        <li>Preferred category: </li>
        <br />
        <li>Highest amount won: </li>
        <li>Average amount won: </li>
        <li>Lowest amount won: </li>
        <br />
        <li>Average time to answer: </li>
        <br />
        <li>Total number of lifelines used: </li>
      </ul>
    </main>
  );
};

export default GameStats;
