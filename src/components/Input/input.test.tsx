/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import Input, { InputProps } from './index'

const renderComponent = (props: InputProps = {}): HTMLInputElement => {
    render(<Input {...props} />)
    const inputEl = screen.getByTestId('input')
    return inputEl as HTMLInputElement
}

describe('Input Component', () => {
    afterEach(cleanup)

    test('Renders without crashing', async () => {
        const inputEl = await renderComponent()
        expect(inputEl).toBeInTheDocument()
    })

    test('Displays specified placeholder text', async () => {
        render(<Input placeholder="Search..." />)
        const inputEl = screen.getByPlaceholderText('Search...')
        expect(inputEl.getAttribute('placeholder')).toBe('Search...')
        expect(inputEl).toBeInTheDocument()
    })

    test('Updates value upon user input', async () => {
        const onChange = jest.fn()
        const inputEl = await renderComponent({ onChange })

        await fireEvent.change(inputEl, {
            target: { value: 'hello world' },
        })
        expect(onChange).toHaveBeenCalledWith('hello world')
    })

    test('Triggers onSubmit callback upon pressing Enter', async () => {
        const onSubmit = jest.fn()
        const inputEl = await renderComponent({
            value: 'hello world',
            onSubmit,
        })
        fireEvent.keyDown(inputEl, { key: 'Enter', code: 'Enter' })
        expect(onSubmit).toHaveBeenCalledWith('hello world')
    })

    test('Truncates inputted text if longer than max length', async () => {
        const onChange = jest.fn()
        const inputEl = await renderComponent({ maxLength: 5, onChange })

        await fireEvent.change(inputEl, {
            target: { value: 'hello world' },
        })
        expect(onChange).toHaveBeenCalledWith('hello')
    })
})
