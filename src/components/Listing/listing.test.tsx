/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { MOCK_LISTINGS } from '../../api/__mocks__/listings'
import Listing from './index'

const renderComponent = (data?: IListing): HTMLElement => {
    render(<Listing data={data || MOCK_LISTINGS[0]} />)
    const listingEl = screen.getByTestId('listing')
    return listingEl
}

describe('Listing Component', () => {
    afterEach(cleanup)

    test('Renders without crashing', async () => {
        const listingEl = await renderComponent()
        expect(listingEl).toBeInTheDocument()
    })
})
