//Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const props = {
    _createPost:          jest.fn(),
    avatar:               'img/avatar.jpg',
    currentUserFirstName: 'Anna',
};

const comment = 'Merry Christmas!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

describe('composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('avatar prop should contain a string value', () => {
        expect(props.avatar).toBe('img/avatar.jpg');
    });

    test('currentUserFirstName prop should contain a string value', () => {
        expect(props.currentUserFirstName).toBe('Anna');
    });

    test('_updateComment class method should be invoked once on onChange event', () => {
        result.find('textarea').simulate('change', { target: { value: 'hello'}});
        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('_submitOnEnter class method should be invoked once when user pressed Enter key in textarea', () => {
        result.find('textarea').simulate('keypress', { key: 'Enter' });
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('_submitComment class method should not be invoked when non-Enter key is pressed', () => {
        result.find('textarea').simulate('keypress', { key: 'w' });
        expect(_submitCommentSpy).toHaveBeenCalledTimes(0);
        jest.clearAllMocks();
    });

    test('_submitComment method should return null when no text is entered in textarea', () => {
        result.setState({
            comment: '',
        });
        result.instance()._submitComment();
        expect(_submitCommentSpy).toHaveReturnedWith(null);
        jest.clearAllMocks();
    });
});

