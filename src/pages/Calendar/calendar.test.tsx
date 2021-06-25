/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import fetchMock from 'fetch-mock'
import { MOCK_CALENDAR } from '../../api/__mocks__/calendar'
import Calendar from './index'

// By default use listingId 1
const DEFAULT_ROUTER = { match: { params: 1 } }

const renderComponent = (props: IRouterProps = DEFAULT_ROUTER): HTMLElement => {
    render(
        // Render within MemoryRouter, to enable usage of 'Link'
        <MemoryRouter>
            <Calendar {...props} />
        </MemoryRouter>
    )

    const pageEl = screen.getByTestId('calendar-page')
    return pageEl
}

// Mock fetch the calendar endpoint
const mockFetchCalendar = (): void => {
    // 1st argument: Endpoint being mocked
    // 2nd argument: Mocked response
    fetchMock.mock('http://localhost:1024/calendar/1', {
        status: 200,
        days: MOCK_CALENDAR,
    })
}

// Simulate hover on element
const simulateHover = (element: Element): void => {
    act(() => {
        fireEvent.mouseOver(element)
    })
}

describe('Calendar Page', () => {
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

    test('Does not display the date popover initially', async () => {
        const pageEl = await renderComponent()
        const datePopoverEl = pageEl.getElementsByClassName('date-popover')
        expect(datePopoverEl.length).toBe(0)
    })

    /**
     * NOTE: Unable to test calendar interactions due to ReactCalendar
     *  tileContent prop not rendering in the test environment's jsdom
     */

    // test.only('Display date popover upon hovering on calendar tile', async () => {
    // mockFetchCalendar()

    // let pageEl

    // let datePopoverEl: any = []
    // await act(async () => {
    //     pageEl = await renderComponent()

    // Initially no date popover
    // datePopoverEl = pageEl.getElementsByClassName('date-popover')
    // expect(datePopoverEl.length).toBe(0)

    // Simulate hover on calendar date tile
    // const tileEl = pageEl.querySelectorAll('.calOverlay')
    // console.log('tileEl.length: ', tileEl.length)
    // console.log('tileEl[0]: ', tileEl[0])

    // const calendar = pageEl.getElementsByClassName('react-calendar')
    // console.log('calendar: ', calendar)
    // console.log('calendar.length: ', calendar[0])
    // simulateHover(tileEl[0])
    // })
    // expect(datePopoverEl.length).toBeGreaterThan(0)

    // if (pageEl) {
    // Date popover in document after hover
    //     datePopoverEl = pageEl.getElementsByClassName('date-popover')
    //     expect(datePopoverEl.length).toBe(1)
    // }
    // })
})
