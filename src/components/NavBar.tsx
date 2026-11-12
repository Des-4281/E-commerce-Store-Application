import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { selectCartCount } from "../redux/cartSlice";

const NavBar = () => {
  const cartCount = useSelector(selectCartCount);

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-Commerce Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart <Badge bg="light" text="dark">{cartCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
