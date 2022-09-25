import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import AuthService from "../service/auth-service";

export function Navigation() {

    const isAuth = AuthService.isSignedIn()

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">DiceRoller</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Rolls</Nav.Link>
                        {isAuth ?
                            <>
                                <Nav.Link href="/add">Add Cells</Nav.Link>
                                <Nav.Link href="#" onClick={() => AuthService.logout()}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="/reg">Signup</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}