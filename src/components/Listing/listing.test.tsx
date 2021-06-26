/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { MOCK_LISTINGS } from '../../api/__mocks__/listings'
import Listing, { ListingProps } from './index'
import { getCalculatedScore } from '../../utils/calculation-utils'

const MOCK_LISTING = MOCK_LISTINGS.listings[0]
const DETAILS_VIEW_PROPS: any = {
    viewType: 'details',
    data: MOCK_LISTING,
}

/**
 * Renders the Listing component.
 * Note that viewType is "card" by default
 * @param props The ListingProps data
 * @returns the listing element
 */
const renderComponent = (
    props: ListingProps = { data: MOCK_LISTING }
): HTMLElement => {
    render(
        <MemoryRouter>
            <Listing {...props} />
        </MemoryRouter>
    )
    const listingEl = screen.getByTestId('listing')
    return listingEl
}

describe('Listing Component', () => {
    afterEach(cleanup)

    test('Renders without crashing', async () => {
        const listingEl = await renderComponent()
        expect(listingEl).toBeInTheDocument()
    })

    /* Tests for CARD VIEW */

    test('Displays the listing title for card view', async () => {
        await renderComponent()
        const titleEl = screen.getByTestId('listing-title')
        expect(titleEl).toBeInTheDocument()
        expect(titleEl).toHaveTextContent(MOCK_LISTING.title)
    })

    test('Displays the listing bed count for card view', async () => {
        await renderComponent()
        const bedCountEl = screen.getByTestId('listing-bed-count')
        expect(bedCountEl).toBeInTheDocument()
        expect(bedCountEl).toHaveTextContent(`${MOCK_LISTING.beds}`)
    })

    test(`Displays listing picture if viewType is "card"`, async () => {
        await renderComponent()
        const pictureEl = screen.getByTestId('listing-picture')
        expect(pictureEl).toBeInTheDocument()
        expect(pictureEl).toHaveAttribute('src', MOCK_LISTING.picture)
    })

    test(`Displays listing health if viewType is "card"`, async () => {
        await renderComponent()
        const healthEl = screen.getByTestId('listing-health')
        const healthScore = getCalculatedScore(MOCK_LISTING.health)
        expect(healthEl).toBeInTheDocument()
        expect(healthEl).toHaveTextContent(healthScore)
    })

    /* Tests for DETAILS VIEW */

    test('Displays the listing title for details view', async () => {
        await renderComponent(DETAILS_VIEW_PROPS)
        const titleEl = screen.getByTestId('listing-title')
        expect(titleEl).toBeInTheDocument()
        expect(titleEl).toHaveTextContent(MOCK_LISTING.title)
    })

    test(`Displays the listing bed count (appended with 'bedrooms') for details view`, async () => {
        await renderComponent(DETAILS_VIEW_PROPS)
        const bedCountEl = screen.getByTestId('listing-bed-count')
        expect(bedCountEl).toBeInTheDocument()
        expect(bedCountEl).toHaveTextContent(`${MOCK_LISTING.beds} bedrooms`)
    })

    test(`Does NOT display listing picture if viewType is "details"`, async () => {
        const listingEl = await renderComponent(DETAILS_VIEW_PROPS)
        const pictureEl = listingEl.getElementsByClassName('listing_picture')
        expect(pictureEl.length).toBe(0)
    })
})
