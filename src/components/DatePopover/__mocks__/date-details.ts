export const MOCK_DATE_DETAILS = {
    date: new Date('2021-01-19'),
    isBlocked: false,
    basePrice: 100,
    total: 150,
    calculatedPrices: {
        basePrice: 100,
        seasonal: 30,
        dayOfWeek: 20,
        predictedPrice: 150,
    },
    factors: {
        seasonal: 0.3,
        dayOfWeek: 0.2,
    },
}

export const MOCK_DATE_DETAILS_BLOCKED = {
    date: new Date('2021-01-19'),
    isBlocked: true,
    calculatedPrices: {
        basePrice: 100,
        seasonal: 30,
        dayOfWeek: 20,
        predictedPrice: 150,
    },
    factors: {
        seasonal: 0.3,
        dayOfWeek: 0.2,
    },
}
