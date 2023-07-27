import { useState } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


export const NavigationBar = (props) => {

    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();

    return (
        // <Navbar expand="lg" onToggle={setToggled}>
        //     <Container>
        //         <Navbar.Toggle />
        //         <Navbar.Brand style={{ color: "white" }}>
        //             <h2>Brand Name</h2>
        //         </Navbar.Brand>
        //         <Navbar.Collapse>
        //             <>
        //                 <Nav>
        //                     <NavLink to="/" as={Link} style={{ color: "black" }}>Home</NavLink>
        //                     <NavLink to="/login" as={Link} style={{ color: "black" }}>Login</NavLink>
        //                 </Nav>
        //                 <Nav>
        //                     <NavLink to="/sign-up" as={Link} style={{ color: "black" }}>Sign Up</NavLink>
        //                 </Nav>
        //             </>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <Navbar bg="dark" className="p-3" variant="dark" expand="lg">
            <Navbar.Brand href="#">
                A Brand Name
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/" as={Link} style={{ color: "white" }}>Home</NavLink>
                    <NavLink to="/login" as={Link} style={{ color: "white" }}>Login</NavLink>
                    <NavLink to="/sign-up" as={Link} style={{ color: "white" }}>Sign Up</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}