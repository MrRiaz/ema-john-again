import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import Home from '../Home/Home';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Navbar  bg="dark" variant="dark">
                <Navbar.Brand href="/home">
                    <img style={{width: '110px', background: 'white', padding: '5px'}} src={logo} alt=""/>
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