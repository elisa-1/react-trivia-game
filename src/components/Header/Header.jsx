import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useModal from "../../modalContext/ModalContext";
import Modal from "../UI/Modal";
import styles from "./Header.module.css";

const Header = () => {
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
  } = useModal();

  return (
    <>
      <Modal
        show={modalShow}
        backdrop={modalBackdrop}
        content={modalContent}
        closeModal={isModalClosable}
        isExitModal={isExitModal}
        onHide={hideModalHandler}
        modalAdditionalClass={modalAdditionalClass}
        goToMainMenu={() => {
          navigate("/");
        }}
      />
      <Navbar expand="lg" className={`${styles.header}`}>
        <Container>
          <Navbar.Brand>React Millionaire Game</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={exitForAuthHandler}>Item</Nav.Link>
              <Nav.Link onClick={exitForAuthHandler}>Item</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
