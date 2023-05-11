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
    logOutHandler
  } = useModal();

  const { user } = UserAuth();

  const noUserNavLinks =
    storedGameStartedFlag !== "1" ? (
      <>
        <Link className="nav-link" to="/" onClick={() => setExpanded(false)}>
          Home
        </Link>
        <Link
          className="nav-link"
          to="/signin"
          onClick={() =>
            setTimeout(() => {
              setExpanded(false);
            }, 150)
          }
        >
          Sign In
        </Link>
        <Link
          className="nav-link"
          to="/signup"
          onClick={() =>
            setTimeout(() => {
              setExpanded(false);
            }, 150)
          }
        >
          Sign Up
        </Link>
      </>
    ) : (
      <>
        <Nav.Link
          onClick={() => {
            exitForAuthHandler("/");
            setTimeout(() => {
              setExpanded(false);
            }, 150);
          }}
        >
          Home
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            exitForAuthHandler("/signin");
            setTimeout(() => {
              setExpanded(false);
            }, 150);
          }}
        >
          Sign In
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            exitForAuthHandler("/signup");
            setTimeout(() => {
              setExpanded(false);
            }, 150);
          }}
        >
          Sign Up
        </Nav.Link>
      </>
    );

  const handleLogout = async () => {
    logOutHandler();
    
    setTimeout(() => {
      setExpanded(false);
    }, 150);

    // try {
    //   await logout();
    //   setUserDocId("");
    //   setUserData({});
    //   navigate("/");
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  const userConnectedNavLinks = (
    <>
      {storedGameStartedFlag !== "1" ? (
        <>
          <Link
            className="nav-link"
            to="/"
            onClick={() =>
              setTimeout(() => {
                setExpanded(false);
              }, 150)
            }
          >
            Home
          </Link>
          <Link
            className="nav-link mb-1 mb-md-0"
            to="/gamestats"
            onClick={() =>
              setTimeout(() => {
                setExpanded(false);
              }, 150)
            }
          >
            Game Stats
          </Link>
        </>
      ) : (
        <>
          <Nav.Link
            onClick={() => {
              exitForAuthHandler("/");
              setTimeout(() => {
                setExpanded(false);
              }, 150);
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            className="mb-1 mb-md-0"
            onClick={() => {
              exitForAuthHandler("/gamestats");
              setTimeout(() => {
                setExpanded(false);
              }, 150);
            }}
          >
            Game Stats
          </Nav.Link>
        </>
      )}
      <Navbar.Text className={`mb-1 mb-md-0 ${styles["navbar-text"]}`}>
        Signed in as: {user?.email}
      </Navbar.Text>
      <Button
        onClick={() => {
          handleLogout();
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
