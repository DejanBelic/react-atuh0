import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { Grid, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'



import Home from './Components/Home';

import './App.css';
import Header from './Components/Header';


class App extends Component {

    static defaultProps = {
        clientId: '1H7CHxyGSarPtwxbmGVJ4kttixlt5wsF',
        domain: 'reactpractice.eu.auth0.com'
    }

    componentWillMount() {
        this.lock = new Auth0Lock(this.props.clientId, this.props.domain);

        // On authentication. new user: username:devuser22@test.com password: testdevuser~4
        // There was issue with cross-origin preflight setup it on https://manage.auth0.com/#/applications/1H7CHxyGSarPtwxbmGVJ4kttixlt5wsF/settings in application settings allowed callbackurls/cors/ 
        this.lock.on('authenticated', (authResult) => {
            console.log(authResult);
            this.lock.getProfile(authResult.accessToken, (error, profile) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(profile)
            });
        })
    }

    showLock() {
        this.lock.show();
    }

    render() {
        return (
            <div className="App">
                <Header onLoginClick={this.showLock.bind(this)} />
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
