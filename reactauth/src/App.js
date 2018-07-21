import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './Components/Home';

import './App.css';
import Header from './Components/Header';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
                            <Home />
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default App;
