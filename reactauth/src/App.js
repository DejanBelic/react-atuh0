import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { Grid, Row, Col } from 'react-bootstrap';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.css'



import Home from './Components/Home';

import './App.css';
import Header from './Components/Header';


class App extends Component {
    constructor() {
        super();
        this.state = {
            idToken: '',
            profile: {}
        }
    }

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
                this.setData(authResult.accessToken, profile);
            });
        });

        this.getData();
    }

    // Set auth token and profile data to localstorage.
    setData(accessToken, profile) {
        localStorage.setItem('idToken', accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.setState({
            idToken: localStorage.getItem('idToken'),
            profile: JSON.parse(localStorage.getItem('profile'))
        });
    }

    // Every time application is rendering it will check localstorage and set the state if there is anything. Check for token and get profile data.
    getData() {
        if (localStorage.getItem('idToken') !== null) {
            this.setState({
                idToken: localStorage.getItem('idToken'),
                profile: JSON.parse(localStorage.getItem('profile'))
            });
        }
    }

    showLock() {
        this.lock.show();
    }


    logout() {
        this.setState({
            idToken: '',
            profile: {}
        }, () => {
            localStorage.removeItem('idToken');
            localStorage.removeItem('profile');
        });
    }

    render() {

        let page;
        if (this.state.idToken) {
            page = <Dashboard
                lock={this.lock}
                idToken={this.state.idToken}
                profile={this.state.profile}
            />
        }
        else {
            page = <Home />
        }

        return (
            <div className="App">
                <Header
                    lock={this.lock}
                    idToken={this.state.idToken}
                    profile={this.state.profile}
                    onLogoutClick={this.logout.bind(this)}
                    onLoginClick={this.showLock.bind(this)}
                />
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
                            {page}
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default App;
