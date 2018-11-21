//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

//Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    static propTypes = {
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
    }

    render() {
        const {
            avatar,
            currentUserFirstName,
        } = this.props;

        return (
            <section className = { Styles.feed }>
                <StatusBar { ...this.props }/>
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post { ...this.props }/>
            </section>
        );
    }
}
