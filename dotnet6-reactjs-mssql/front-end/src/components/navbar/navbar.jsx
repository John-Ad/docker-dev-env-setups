import { useState } from "react";
import { Navbar, Container, Nav, NavLink, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "./navbar.css";

export const NavigationBar = (props) => {

    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();

    return (
        <Navbar className="navbar-custom" variant="" expand="lg" onToggle={setToggled}>
            <Container>
                <Navbar.Toggle />
                <Navbar.Brand style={{ color: "white" }}>
                    {/* <img className="rounded" src={AppLogo} alt="An awesome logo" style={{ width: "120px", height: "35px", marginRight: "20px" }} /> */}
                </Navbar.Brand>
                <Navbar.Collapse>
                    {
                        props.loggedIn &&
                        <>
                            <Nav>
                                <NavLink to="/home" as={Link} style={{ color: "black" }}>Home</NavLink>
                                <NavLink to="/dashboard" as={Link} style={{ color: "black" }}>Dashboard</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to="/achievements" as={Link} style={{ color: "black" }}>Achievements</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to="/MLentry" as={Link} style={{ color: "black" }}>ML</NavLink>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav >
                        {
                            !props.loggedIn &&
                            <>
                                <Button style={{ marginRight: "20px" }} variant="light" onClick={() => navigate("/register")}>Sign Up</Button>
                                <Button variant="success" onClick={() => navigate("/")}>Login</Button>
                            </>
                        }
                        {
                            props.loggedIn &&
                            <Button variant="primary" onClick={() => {
                                props.logout();
                                navigate("/");
                            }}>Logout</Button>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}