import { Container, Nav, Navbar, } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

/* Builds webpage base that is loaded within the main.tsx
*  Adds the Navbar using Bootstrap elements to replace <a> tags,
* preventing reload on click.
* Uses Outlet to pass in the child elements from the router.
*/

export default function BasePage() {


    return (
        <div className="bg-secondary">
            <div className="row">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="border-bottom border-light">Date Manager</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <span className="border-end border-secondary" />
                        <Nav.Link as={Link} to="/enter">Enter Inventory</Nav.Link>
                        <span className="border-end border-secondary" />
                        <Nav.Link as={Link} to="/watchlist">Watchlist</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </div>
            <div className="container-fluid">
            <div className="row justify-content-evenly">
                <div className="col-sm-1"></div>
                <Outlet />
                <div className="col-sm-1"></div>
            </div>
            </div>
            <footer className="bg-dark text-light text-end">
                Created By Dylan Karr 2025
            </footer>
        </div>
    )
}