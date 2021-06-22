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

/* API */

// Listings
declare interface IListing {
    id: number
    title: string
    picture: string
    ranking: number
    currency: string
    bed: number
}

// Calendar
declare interface IDateDetails extends ICalendarDay {
    date: Date
}

declare interface ICalendarDay {
    dateOffset: number
    isBlocked: boolean
    rate: IRate
}

declare interface IRate {
    DOW: number
    seasonal: number
    total: number
}
