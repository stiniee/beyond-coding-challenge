/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import {
    MOCK_DATE_DETAILS,
    MOCK_DATE_DETAILS_BLOCKED,
} from './__mocks__/date-details'
import { formatDate } from '../../utils/date-utils'
import DatePopover from './index'

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
            'date-popover_blocked-status'
        )
        expect(blockedChipEl.length).toBe(0)
    })

    test('Displays BLOCKED status if the date is blocked', async () => {
        const popoverEl = await renderComponent(MOCK_DATE_DETAILS_BLOCKED)
        const blockedChipEl = popoverEl.getElementsByClassName(
            'date-popover_blocked-status'
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

    test('Display the calculated prices, factors prefixed with either "+" (increase) or "-"', async () => {
        await renderComponent()
        const priceDetailsEl = screen.getByTestId('date-popover-price-details')
        expect(priceDetailsEl.children.length).toBeGreaterThan(0)

        const priceEls = priceDetailsEl.children
        const { basePrice, seasonal, dayOfWeek, predictedPrice } =
            MOCK_DATE_DETAILS.calculatedPrices

        // Check base price
        expect(priceEls[0]).toHaveTextContent(`$${basePrice}`)

        // Check seasonality
        expect(priceEls[1]).toHaveTextContent(`+$${Math.abs(seasonal)}`)

        // Check day of week
        expect(priceEls[2]).toHaveTextContent(`-$${Math.abs(dayOfWeek)}`)

        // Check predicted price
        expect(priceEls[3]).toHaveTextContent(`${predictedPrice}`)
    })
})
