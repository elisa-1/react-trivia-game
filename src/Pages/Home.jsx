import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import useModal from "../modalContext/ModalContext";
import { UserAuth } from "../authContext/AuthContext";
import { getCategories } from "../services/api";
import { UI_TEXT } from "../services/constants";
import Form from "../components/Form/Form";
import Spinner from "../components/UI/Spinner";
import milionnaireLogo from "../assets/logo-489x489.png";
import styles from "./Home.module.css";

const Home = () => {
  const { hideModalHandler } = useModal();
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const { userDocId } = UserAuth();


  useEffect(() => {
    hideModalHandler();
    localStorage.clear();

    const getData = async () => {
      try {
        const res = await getCategories();
        if (res.status === 200) {
          setCategories((prev) => {
            if (prev.length === 1) {
              return [...prev, ...Object.keys(res.data)];
            } else {
              return prev;
            }
          });
        }
      } catch (err) {
        console.log("Something went wrong.", err.message);
      }
    };
    getData();
  }, [hideModalHandler]);

  const handleSelectedCategory = (value) => {
    if (selectedCategory !== value) setSelectedCategory(value);
  };

  const increaseGamesNumber = async () => {
    const userDoc = doc(db, 'stats', userDocId);
    await updateDoc(userDoc, {
        gamesPlayedNumber : increment(1)
    });
}

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const category = selectedCategory.toLocaleLowerCase().split(" ")[0];
    localStorage.setItem("gameStarted", "1");
    increaseGamesNumber();
    navigate(`/game/${category}`);
  };

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-home"]}`}
    >
      {categories.length > 1 ? (
        <>
          <Form
            data={categories}
            label={UI_TEXT.selectCategoryMessage}
            type={"categories"}
            onGetSelectedOption={handleSelectedCategory}
            onSubmit={handleFormSubmit}
          />
          <div className={`d-flex align-items-center ${styles["main-image"]}`}>
            <img
              src={milionnaireLogo}
              alt="Who Wants to Be a Millionaire logo"
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Home;
