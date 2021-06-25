/**
 * Takes in the basePrice and factors (seasonal and dayOfWeek),
 * and returns all the calculated prices as an object of PriceType keys
 * (i.e basePrice, seasonal, dayOfWeek, total) to each their respective calculated prices
 * @param basePrice The base minimum price
 * @param seasonal The price change factor based on the season
 * @param dayOfWeek The price change factor based on the day of week
 * @returns
 */
export const getCalculatedPrices = (
    basePrice: number,
    seasonal: number,
    dayOfWeek: number
): Record<PriceType, number> => {
    // Apply seasonal factor
    const seasonalChange = Math.round(basePrice * seasonal)

    // Apply day of week factor
    const dayOfWeekChange = Math.round(basePrice * dayOfWeek)

    // Get the total increase/decrease amount
    const amountChange = seasonalChange + dayOfWeekChange

    // Get the final predicted price
    const predictedPrice = basePrice + amountChange

    return {
        basePrice,
        predictedPrice,
        seasonal: seasonalChange,
        dayOfWeek: dayOfWeekChange,
    }
}
