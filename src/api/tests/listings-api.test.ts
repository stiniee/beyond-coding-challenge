import ListingsApi from '../listings-api'

describe('Listings API', () => {
    test('Returns 200 status with the listings data', async () => {
        const res = await ListingsApi.getListings()
        console.log('res: ', res)
    })
})
