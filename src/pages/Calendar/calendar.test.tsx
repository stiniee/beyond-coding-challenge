/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import Calendar from './index'

// By default use listingId 1
const DEFAULT_ROUTER = { match: { params: 1 } }

const renderComponent = (props: IRouterProps = DEFAULT_ROUTER): HTMLElement => {
    render(<Calendar {...props} />)
    const pageEl = screen.getByTestId('calendar-page')
    return pageEl
}

describe('Calendar Component', () => {
    afterEach(cleanup)

    test('Renders without crashing', async () => {
        const pageEl = await renderComponent()
        expect(pageEl).toBeInTheDocument()
    })

    test('Displays the calendar', async () => {
        await renderComponent()
        const calendarEl = screen.getByTestId('calendar')
        expect(calendarEl).toBeInTheDocument()
    })
})
