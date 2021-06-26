const BASE_API_URL = 'http://localhost:1024'
const MOCK_ID = '1'

export default {
    /**
     * Gets the calendar associated with the specified listing
     * @param listingId: The listing id
     * @returns res: the response data (ICalendar), if succeeds
     * @returns err: the error, if fails
     */
    async getCalendar(
        listingId: number,
        body?: Record<string, any>,
        config: RequestInit = {}
    ): Promise<ICalendar> {
        try {
            const res = await fetch(
                `${BASE_API_URL}/calendar/${listingId || MOCK_ID}`,
                {
                    method: 'GET',
                    body: body ? JSON.stringify(body) : undefined,
                    ...config,
                }
            )
            return res.json()
        } catch (err) {
            throw new Error(err)
        }
    },

    /**
     * Updates the calendar associated with the specified listing
     * @param listingId: The listing id
     * @param body: Body params to be updated with
     * @param config: Configurations the fetch api call
     * @returns res: the response data (ICalendar), if succeeds
     * @returns err: the error, if fails
     */
    async updateCalendar(
        listingId: number,
        body?: Record<string, any>,
        config: RequestInit = {}
    ): Promise<ICalendar> {
        try {
            const res = await fetch(
                `${BASE_API_URL}/calendar/${listingId || MOCK_ID}`,
                {
                    method: 'POST',
                    body: body ? JSON.stringify(body) : undefined,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    ...config,
                }
            )
            return res.json()
        } catch (err) {
            throw new Error(err)
        }
    },
}
