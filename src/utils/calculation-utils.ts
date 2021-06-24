/**
 * Takes in the basePrice and factors (seasonal and dayOfWeek),
 * and returns all the calculated prices as an object of PriceType keys
 * (i.e basePrice, seasonal, dayOfWeek, total) to each their respective calculated prices
 * @param basePrice The base minimum price
 * @param seasonal The price increase rate based on the season
 * @param dayOfWeek The price increase rate based on the day of week
 * @returns
 */
export const getCalculatedPrices = (
    basePrice: number,
    seasonal: number,
    dayOfWeek: number
): Record<PriceType, number> => {
    // Get increase due to seasonal
    const increaseBySeasonal = Math.round(basePrice * seasonal)

    // Get increase due to day of week
    const increaseByDayOfWeek = Math.round(basePrice * dayOfWeek)

    // Get the total increase amount
    const increaseAmount = increaseByDayOfWeek + increaseBySeasonal

    // Get the final predicted price
    const predictedPrice = basePrice + increaseAmount

    return {
        basePrice,
        predictedPrice,
        seasonal: increaseBySeasonal,
        dayOfWeek: increaseByDayOfWeek,
    }
}
