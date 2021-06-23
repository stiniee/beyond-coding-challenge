// import fetchMock from 'fetch-mock'
import ListingsApi from '../listings-api'
import { MOCK_LISTINGS } from './__mocks__/listings'

const API_ENDPOINT = 'http://localhost:5000/listings'

// const mockWithNoResults = fetchMock.sandbox().mock(API_ENDPOINT, {
//     total_count: 0,
//     incomplete_results: false,
//     items: [],
// })

// const mockWithResults = fetchMock.sandbox().mock(API_ENDPOINT, {
//     total_count: MOCK_LISTINGS.length,
//     incomplete_results: false,
//     items: MOCK_LISTINGS,
// })

describe('Listings API', () => {
    test('Returns 200 status with the listings data', async () => {})
})
