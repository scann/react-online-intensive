// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/lisa';

@hot(module)
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar,
            currentUserFirstName: 'Анна',
            currentUserLastName:  'Краснощек',
            isAuthenticated:      false,
            _toggleLogin:         this._toggleLogin,
        };
    }

    componentDidMount() {
        const login = window.localStorage.getItem('fb_login');
        if (login) {
            this._toggleLogin(login);
        }
    }

    _toggleLogin = (state) => {
        this.setState(() => ({
            isAuthenticated: state,
        }));
    };

    render() {
        const { isAuthenticated } = this.state;

        const CustomRoute = (props) => {
            if (isAuthenticated) {
                return <Route { ...props } />;
            }

            return <Redirect to = '/login' />;
        };

        return (
            <Catcher>
                <Provider value = { this.state }>
                    <StatusBar />
                    <Switch>
                        <CustomRoute
                            path = '/feed'
                            render = { () => <Feed /> }
                        />
                        <CustomRoute
                            path = '/profile'
                            render = { () => <Profile /> }
                        />
                        <Route
                            _toggleLogin = { this.state._toggleLogin }
                            path = '/login'
                            render = { () => <Login /> }
                        />
                        <Redirect to = '/login'/>
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
