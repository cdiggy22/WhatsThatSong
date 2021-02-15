import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const NavBar = ({logout}) => {
    return (
        <div className="navbar navbar-light bg-light mb-3">
            <Navbar expand="md">
                <NavLink exact to="/" className="navbar-brand">
                What's That Song 
                </NavLink>

                <Nav className="ml-auto" navbar>
                <NavItem>
                     <NavLink to="/" onClick={logout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/tracks">Saved Tracks</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/artists"> Artists </NavLink>
                </NavItem>
                </Nav>
            </Navbar>

        </div>
    )
}

export default NavBar;