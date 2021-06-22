const BASE_API_URL = 'http://localhost:5000'
/**
 * Gets all the listings
 * @param params: The parameters to pass into the api config
 *        fetchMock is used to mock API requests
 * @returns res: the response data, if succeeds
 * @returns err: the error, if fails
 */
export default {
    async getListings(
        body?: Record<string, any>,
        config: RequestInit = {}
    ): Promise<any> {
        console.log('getListings')
        try {
            const res = await fetch(`${BASE_API_URL}/listings`, {
                method: 'GET',
                body: body ? JSON.stringify(body) : undefined,
                ...config,
            })
            console.log('getListings res.json(): ', res.json())
            // return res.json()
        } catch (err) {
            console.log('err: ', err)
            throw err
        }
    },
}
