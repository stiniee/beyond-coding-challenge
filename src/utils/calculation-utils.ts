export const calculatePrice = (
    basePrice: number,
    factors: number[]
): number => {
    let priceIncrease = 0

    factors.forEach((factor: number) => {
        const increase = basePrice * factor
        priceIncrease += increase
    })

    // Get the final price
    return basePrice + priceIncrease
}
