import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Navbar  bg="dark" variant="dark">
                <Navbar.Brand> 
                    <Link to="/home">
                        <img style={{width: '110px', background: 'white', padding: '5px'}} src={logo} alt=""/>
                    </Link>
                </Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link> <Link to="/home">Home</Link> </Nav.Link>
                <Nav.Link> <Link to="/review">Review Order</Link> </Nav.Link>
                <Nav.Link> <Link to="/inventory">Inventory Manage</Link> </Nav.Link>
                <Nav.Link> <Link to="/login">Log in</Link> </Nav.Link>
                </Nav>
            </Navbar>
        </div>
        
    );
};

export default Header;