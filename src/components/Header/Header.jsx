import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useModal from "../../modalContext/ModalContext";
import Modal from "../UI/Modal";
import styles from "./Header.module.css";

const Header = () => {
  const storedGameStartedFlag = localStorage.getItem("gameStarted");
  const navigate = useNavigate();

  const {
    modalShow,
    modalBackdrop,
    modalContent,
    isModalClosable,
    isExitModal,
    exitForAuthHandler,
    modalAdditionalClass,
    hideModalHandler,
    navigatesToMenu,
  } = useModal();

  const navLinks =
    storedGameStartedFlag !== "1" ? (
      <>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/signin">
          Sign In
        </Link>
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </>
    ) : (
      <>
        <Link
          className="nav-link"
          onClick={() => {
            exitForAuthHandler("/");
          }}
        >
          Home
        </Link>
        <Link
          className="nav-link"
          onClick={() => {
            exitForAuthHandler("/signin");
          }}
        >
          Sign In
        </Link>
        <Link
          className="nav-link"
          onClick={() => {
            exitForAuthHandler("/signup");
          }}
        >
          Sign Up
        </Link>
      </>
    );

  return (
    <>
      <Modal
        show={modalShow}
        backdrop={modalBackdrop}
        content={modalContent}
        closeModal={isModalClosable}
        isExitModal={isExitModal}
        navigatesToMenu={navigatesToMenu}
        onHide={hideModalHandler}
        modalAdditionalClass={modalAdditionalClass}
        goToMainMenu={() => {
          navigate("/");
        }}
      />
      <Navbar expand="lg" className={`${styles.header}`}>
        <Container>
          <Navbar.Brand className={styles.brand}>
            React Millionaire Game
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">{navLinks}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
