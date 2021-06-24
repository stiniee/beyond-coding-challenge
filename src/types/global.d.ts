/* General */
declare interface DefaultProps {
    id?: string
    className?: string
    style?: React.CSSProperties
}

/* Route */
interface IRouterProps {
    match: Record<string, any>
}

declare type Route = Record<string, any>

// Stands for Deep Partial.
// Maps all the properties of some type "T" as optional
declare type DP<T> = {
    [P in keyof T]?: DP<T[P]>
}

/* MOCK */
declare type FetchMock = import('fetch-mock').FetchMockSandbox

/* API */

// Listings
declare interface IListing {
    id: number
    title: string
    picture: string
    health: number
    currency: string
    beds: number
}

// Calendar
declare type FactorType = 'dayOfWeek' | 'seasonal'
declare type PriceType = FactorType | 'basePrice' | 'predictedPrice'
declare type Factor = Record<FactorType, number>

declare interface ICalendarDay {
    isBlocked: boolean
    factors: Factor
}

declare interface IDateDetails extends ICalendarDay {
    date: Date
    calculatedPrices: Record<PriceType, number>
}
