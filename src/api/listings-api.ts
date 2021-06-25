// const BASE_API_URL = 'http://localhost:5000'
const BASE_API_URL = 'http://localhost:1024'

/**
 * Gets all the listings
 * @param params: The parameters to pass into the api config
 * @returns res: the response data, if succeeds
 * @returns err: the error, if fails
 */
export default {
    async getListings(
        body?: Record<string, any>,
        config: RequestInit = {}
    ): Promise<any> {
        try {
            const res = await fetch(`${BASE_API_URL}/listings`, {
                method: 'GET',
                body: body ? JSON.stringify(body) : undefined,
                ...config,
            })
            return res.json()
        } catch (err) {
            throw new Error(err)
        }
    },
}
