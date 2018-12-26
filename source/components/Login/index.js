//Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    _authenticateUser = () => {
        const { _toggleLogin } = this.props;
        console.log('_this.props received', this.props);
        window.localStorage.setItem('fb_login', true);
        _toggleLogin(true);
    };

    render() {
        return (
            <section className = { Styles.login }>
                <a onClick = { this._authenticateUser }>
                    Войти
                </a>
            </section>
        );
    }
}
