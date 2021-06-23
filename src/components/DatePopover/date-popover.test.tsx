/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import {
    MOCK_DATE_DETAILS,
    MOCK_DATE_DETAILS_BLOCKED,
} from './__mocks__/date-details'
import { formatDate } from '../../utils/date-utils'
import DatePopover from './index'

// By default use listingId 1
const DEFAULT_ROUTER = { match: { params: 1 } }

const renderComponent = (data?: IDateDetails): HTMLElement => {
    render(<DatePopover data={data || MOCK_DATE_DETAILS} />)
    const datePopoverEl = screen.getByTestId('date-popover')
    return datePopoverEl
}

describe('DatePopover Component', () => {
    afterEach(cleanup)

    test('Renders without crashing', async () => {
        const datePopoverEl = await renderComponent()
        expect(datePopoverEl).toBeInTheDocument()
    })

    test('Does NOT display BLOCKED status if date is NOT blocked', async () => {
        const popoverEl = await renderComponent()
        const blockedChipEl = popoverEl.getElementsByClassName(
            'date-popover_header-blocked-status'
        )
        expect(blockedChipEl.length).toBe(0)
    })

    test('Displays BLOCKED status if the date is blocked', async () => {
        const popoverEl = await renderComponent(MOCK_DATE_DETAILS_BLOCKED)
        const blockedChipEl = popoverEl.getElementsByClassName(
            'date-popover_header-blocked-status'
        )
        expect(blockedChipEl.length).toBe(1)
    })

    test('Displays formatted version of the date provided to it', async () => {
        await renderComponent()
        const dateEl = screen.getByTestId('date-popover-date')
        expect(dateEl).toBeInTheDocument()

        const formattedDate = formatDate(MOCK_DATE_DETAILS.date)
        expect(dateEl).toHaveTextContent(formattedDate)
    })

    test('Displays the rate total provided to it', async () => {
        await renderComponent()
        const rateTotalEl = screen.getByTestId('date-popover-rate-total')
        expect(rateTotalEl).toBeInTheDocument()
        expect(rateTotalEl).toHaveTextContent(`${MOCK_DATE_DETAILS.rate.total}`)
    })

    test('Displays the rate details provided to it', async () => {
        await renderComponent()
        const priceDetailsEl = screen.getByTestId('date-popover-price-details')
        expect(priceDetailsEl.children.length).toBeGreaterThan(0)

        const { rate } = MOCK_DATE_DETAILS

        Object.keys(rate).forEach((key, index) => {
            const listItemEl = priceDetailsEl.children[index]

            const priceEl = listItemEl.getElementsByClassName('price')

            expect(priceEl.length).toBe(1)

            if (key === 'seasonal' || key === 'DOW') {
                expect(priceEl[0]).toHaveTextContent(
                    `+ $${rate[key as PriceType]}`
                )
            } else {
                expect(priceEl[0]).toHaveTextContent(
                    `$${rate[key as PriceType]}`
                )
            }
        })
    })
})
