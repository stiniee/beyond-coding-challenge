import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import { MOCK_CALENDAR } from '../../api/__mocks__/calendar'
import { MOCK_LISTINGS } from '../../api/__mocks__/listings'
import Calendar from './index'

// By default use the first mock listing
const MOCK_LISTING = MOCK_LISTINGS.listings[0]
const DEFAULT_ROUTER = {
    match: { params: MOCK_LISTING.id },
    location: { state: { listingData: MOCK_LISTING } },
}

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
        ...MOCK_CALENDAR,
    })
}

// Simulate hover on element
// const simulateHover = (element: Element): void => {
//     act(() => {
//         fireEvent.mouseOver(element)
//     })
// }

describe('Calendar Page', () => {
    afterEach(() => {
        fetchMock.restore()
        cleanup()
    })

    test('Renders without crashing', async () => {
        const pageEl = await renderComponent()
        expect(pageEl).toBeInTheDocument()
    })

    test('Displays the listing', async () => {
        await renderComponent()
        const listingEls = screen.getAllByTestId('listing')
        expect(listingEls.length).toBe(1)
        expect(listingEls[0]).toHaveTextContent(MOCK_LISTING.title)
    })

    test('Displays the base price input field with the initial base price', async () => {
        // Populate the calendar days with the data
        await act(async () => {
            mockFetchCalendar()
            await renderComponent()
        })

        const inputContainerEl = screen.getByTestId('base-price-input')
        expect(inputContainerEl).toHaveTextContent('Base Price')

        const inputEl = document.getElementsByTagName('input')[0]
        expect(inputEl).toHaveValue(MOCK_CALENDAR.basePrice)
    })

    test('Displays the calendar', async () => {
        await renderComponent()
        const calendarEl = screen.getByTestId('calendar')
        expect(calendarEl).toBeInTheDocument()
        expect(calendarEl).toHaveTextContent('June')
    })

    test('Calendar starts on the current month', async () => {
        await renderComponent()
        const calendarEl = screen.getByTestId('calendar')

        const currentMonth = new Date().toLocaleString('default', {
            month: 'long',
        })
        expect(calendarEl).toHaveTextContent(currentMonth)
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

    // test.('Display date popover upon hovering on calendar tile', async () => {
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
