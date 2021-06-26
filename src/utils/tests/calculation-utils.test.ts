import { getCalculatedPrices, getCalculatedScore } from '../calculation-utils'

const PRICE_KEYS = ['basePrice', 'seasonal', 'dayOfWeek', 'predictedPrice']

describe('getCalculatedPrices util', () => {
    // Note: Price keys are basePrice, seasonal, dayOfWeek, predictedPrice
    test('If all arguments are 0s, each of the returned prices should be 0', async () => {
        const prices = getCalculatedPrices(0, 0, 0)
        Object.keys(prices).forEach((key, idx) => {
            expect(key).toBe(PRICE_KEYS[idx])
            expect(prices[key as PriceType]).toBe(0)
        })
    })

    test(`Returned object's "basePrice" is the same as the first argument`, async () => {
        let basePrice = 100
        let prices = getCalculatedPrices(basePrice, 0, 0)
        expect(prices.basePrice).toBe(basePrice)

        basePrice = 400
        prices = getCalculatedPrices(basePrice, 0, 0)
        expect(prices.basePrice).toBe(basePrice)
    })

    test(`Returned object's "seasonal" is the product of base price and the seasonal factor`, async () => {
        let basePrice = 100
        let seasonal = 0.5
        let product = Math.round(basePrice * seasonal)
        let prices = getCalculatedPrices(basePrice, seasonal, 0)
        expect(prices.seasonal).toBe(product)

        basePrice = 500
        seasonal = -0.1
        product = Math.round(basePrice * seasonal)
        prices = getCalculatedPrices(basePrice, seasonal, 0)
        expect(prices.seasonal).toBe(product)
    })

    test(`Returned object's "dayOfWeek" is the product of base price and the dayOfWeek factor`, async () => {
        let basePrice = 150
        let dayOfWeek = -0.2
        let product = Math.round(basePrice * dayOfWeek)
        let prices = getCalculatedPrices(basePrice, 0, dayOfWeek)
        expect(prices.dayOfWeek).toBe(basePrice * dayOfWeek)

        basePrice = 200
        dayOfWeek = 0.3
        product = Math.round(basePrice * dayOfWeek)
        prices = getCalculatedPrices(basePrice, 0, dayOfWeek)
        expect(prices.dayOfWeek).toBe(product)
    })

    // NOTE: The factors refers to "seasonal" and "dayOfWeek"
    test(`Returned object's "predictedPrice" is the sum of the basePrice and the products between basePrice and the factors`, async () => {
        const basePrice = 100
        const seasonal = 0.5
        const dayOfWeek = -0.2
        const prodSeasonal = Math.round(basePrice * seasonal)
        const prodDayOfWeek = Math.round(basePrice * dayOfWeek)
        const total = basePrice + prodSeasonal + prodDayOfWeek
        const prices = getCalculatedPrices(basePrice, seasonal, dayOfWeek)
        expect(prices.predictedPrice).toBe(total)
    })
})

describe('getCalculatedScore util', () => {
    test('Gets the calculated score (the ratio as a fraction of 100)', async () => {
        let score = getCalculatedScore(0.5)
        expect(score).toBe(50)

        score = getCalculatedScore(0.25)
        expect(score).toBe(25)
    })
})
