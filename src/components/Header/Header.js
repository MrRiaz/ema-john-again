import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">
                    <img style={{width: '110px'}} src={logo} alt=""/>
                </Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/shop">Shop</Nav.Link>
                <Nav.Link href="/review">Review Order</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;