export const calculatePrice = (
    basePrice: number,
    dayOfWeek: number,
    seasonal: number
): number => {
    // Get increase due to day of week
    const increaseByDayOfWeek = basePrice * dayOfWeek

    // Get increase due to seasonal
    const increaseBySeasonal = basePrice * seasonal

    // Get the total increase amount
    const increaseAmount = increaseByDayOfWeek + increaseBySeasonal

    // Get the final price
    return basePrice + increaseAmount
}
