import React from "react";
import Form from "../components/Form/Form";
import styles from "./Home.module.css";
import milionnaireLogo from "../assets/logo-489x489.png";

const Home = () => {
  return (
    <main className="d-flex justify-content-center align-items-center">
      <Form />
      <div className={`d-flex align-items-center ${styles["main-image"]}`}>
        <img src={milionnaireLogo} alt="Who Wants to Be a Millionaire logo" />
      </div>
    </main>
  );
};

export default Home;
