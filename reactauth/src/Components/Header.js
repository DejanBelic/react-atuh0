import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    onLoginClick() {
        this.props.onLoginClick();
    }

    onLogoutClick() {
        this.props.onLogoutClick();
    }

    render() {
        let navItems;
        if (this.props.idToken) {
            navItems = <NavItem onClick={this.onLogoutClick.bind(this)} href="#">Logout</NavItem>
        }
        else {
            navItems = <NavItem onClick={this.onLoginClick.bind(this)} href="#">Login</NavItem>

        }
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        React Auth App
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {navItems}
                </Nav>
            </Navbar>
        );
    }
}

export default App;
