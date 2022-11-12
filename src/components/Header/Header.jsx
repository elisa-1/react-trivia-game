import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Navbar expand="lg" className={`${styles.header}`}>
      <Container>
        <Navbar.Brand>React Millionaire Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link" onClick={props.onClick}>
              Item
            </Link>
            <Link to="/" className="nav-link" onClick={props.onClick}>
              Item
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
