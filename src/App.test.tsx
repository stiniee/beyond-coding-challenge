import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders App without crashing', () => {
    render(<App />)
})
