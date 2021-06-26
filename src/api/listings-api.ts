import BASE_API_URL from './constants/BASE_API_URL'

export default {
    /**
     * Gets all the listings
     * @param params: The parameters to pass into the api config
     * @returns res: the response data (IListings), if succeeds
     * @returns err: the error, if fails
     */
    async getListings(
        body?: Record<string, any>,
        config: RequestInit = {}
    ): Promise<IListings> {
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
