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
declare type PriceType = 'dayOfWeek' | 'seasonal'
declare type Factor = Record<PriceType, number>

declare interface IDateDetails extends ICalendarDay {
    date: string
}

declare interface ICalendarDay {
    isBlocked: boolean
    factors: Factor
}
