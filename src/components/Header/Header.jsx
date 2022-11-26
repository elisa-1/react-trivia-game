import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useModal from "../../modalContext/ModalContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { UserAuth } from "../../authContext/AuthContext";
import styles from "./Header.module.css";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

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

  const { user, logout, setUserDocId, setUserData } = UserAuth();

  const noUserNavLinks =
    storedGameStartedFlag !== "1" ? (
      <>
        <Link className="nav-link" to="/" onClick={() => setExpanded(false)}>
          Home
        </Link>
        <Link
          className="nav-link"
          to="/signin"
          onClick={() => setExpanded(false)}
        >
          Sign In
        </Link>
        <Link
          className="nav-link"
          to="/signup"
          onClick={() => setExpanded(false)}
        >
          Sign Up
        </Link>
      </>
    ) : (
      <>
        <Nav.Link
          onClick={() => {
            exitForAuthHandler("/");
            setExpanded(false);
          }}
        >
          Home
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            exitForAuthHandler("/signin");
            setExpanded(false);
          }}
        >
          Sign In
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            exitForAuthHandler("/signup");
            setExpanded(false);
          }}
        >
          Sign Up
        </Nav.Link>
      </>
    );

  const handleLogout = async () => {
    try {
      await logout();
      setUserDocId("");
      setUserData({});
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const userConnectedNavLinks = (
    <>
      {storedGameStartedFlag !== "1" ? (
        <>
          <Link className="nav-link" to="/" onClick={() => setExpanded(false)}>
            Home
          </Link>
          <Link
            className="nav-link"
            to="/gamestats"
            onClick={() => setExpanded(false)}
          >
            Game Stats
          </Link>
        </>
      ) : (
        <>
          <Nav.Link
            onClick={() => {
              exitForAuthHandler("/");
              setExpanded(false);
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              exitForAuthHandler("/gamestats");
              setExpanded(false);
            }}
          >
            Game Stats
          </Nav.Link>
        </>
      )}
      <Navbar.Text className={`${styles["navbar-text"]}`}>
        Signed in as: {user?.email}
      </Navbar.Text>
      <Button
        onClick={() => {
          handleLogout();
          setExpanded(false);
        }}
      >
        Logout
      </Button>
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
      <Navbar expanded={expanded} expand="md" className={`${styles.header}`}>
        <Container>
          <Navbar.Brand className={styles.brand}>
            React Millionaire Game
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded((prevState) => !prevState)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user ? noUserNavLinks : userConnectedNavLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
