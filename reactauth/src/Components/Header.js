import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    onLoginClick() {
        this.props.onLoginClick();
    }
    
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        React Auth App
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={this.onLoginClick.bind(this)} href="#">Login</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default App;
