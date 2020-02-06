import React from 'react';
import {create} from 'react-test-renderer';
import UserStatusClass from "./classUserStatus";

describe('UserStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<UserStatusClass status='Hi world!' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Hi world!');
    });

    test('span length should be one', () => {
        const component = create(<UserStatusClass status='Hi world!' />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('span should be one', () => {
        const component = create(<UserStatusClass status='Hi world!' />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('Hi world!');
    });

    test('input shouldn\'t be displayed', () => {
        const component = create(<UserStatusClass status='Hi world!' />);
        const root = component.root;
        expect(() => { const input = root.findByType('input'); }).toThrow();
    });

    test('input shouldbe displayed in editMode instead of span', () => {
        const component = create(<UserStatusClass status='Hi world!' />);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');

        expect(input.props.value).toBe('Hi world!');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<UserStatusClass status='Hi world!' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();

        expect(mockCallback.mock.calls.length).toBe(1);
    });
});