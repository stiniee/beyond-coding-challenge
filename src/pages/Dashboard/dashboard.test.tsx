/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, cleanup, act } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import Dashboard from './index'
import { MOCK_LISTINGS } from '../../api/__mocks__/listings'

const renderComponent = (): HTMLElement => {
    render(
        // Render within MemoryRouter, to enable usage of 'Link'
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    )
    const pageEl = screen.getByTestId('dashboard-page')
    return pageEl
}

// Mock fetch the listings endpoint
const mockFetchListings = (): void => {
    fetchMock.mock('http://localhost:1024/listings', {
        status: 200,
        listings: MOCK_LISTINGS,
    })
}

describe('Dashboard Page', () => {
    beforeEach(() => {
        fetchMock.reset()
    })

    afterEach(cleanup)

    test('Renders without crashing', async () => {
        const pageEl = await renderComponent()
        expect(pageEl).toBeInTheDocument()
    })

    test.only('Displays the listings', async () => {
        await mockFetchListings()

        // Initially no listings
        let listingEls = document.getElementsByClassName('listing')
        expect(listingEls.length).toBe(0)

        // Populate listings from fetched data
        await act(async () => {
            const pageEl = await renderComponent()
            listingEls = pageEl.getElementsByClassName('listing')
        })
        expect(listingEls.length).toBeGreaterThan(0)

        for (let idx = 0; idx < listingEls.length; idx += 1) {
            expect(listingEls[idx]).toHaveTextContent(MOCK_LISTINGS[idx].title)
        }
    })
})
