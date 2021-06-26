/*----------------------------------------------------------
    General
----------------------------------------------------------*/
declare interface DefaultProps {
    id?: string
    className?: string
    style?: React.CSSProperties
}

declare interface IDateConfig {
    locales?: string | string[]
    options?: {
        year?: 'numeric' | '2-digit'
        month?: 'short' | 'long'
        day?: 'numeric' | '2-digit'
    }
}

/*----------------------------------------------------------
    Route
----------------------------------------------------------*/
interface IRouterProps {
    match?: Record<string, any>
    location?: Record<string, any>
}

declare type Route = Record<string, any>

/*----------------------------------------------------------
    Mock
----------------------------------------------------------*/
declare type FetchMock = import('fetch-mock').FetchMockSandbox

/*----------------------------------------------------------
    API
----------------------------------------------------------*/

// Listing
declare interface IListing {
    id: number
    title: string
    picture: string
    health: number
    currency: string
    beds: number
}
declare interface IListings {
    listings: IListing[]
}

// Pricing
declare type FactorType = 'dayOfWeek' | 'seasonal'
declare type PriceType = FactorType | 'basePrice' | 'predictedPrice'
declare type Factor = Record<FactorType, number>

// Calendar
declare interface ICalendarDay {
    isBlocked: boolean
    factors: Factor
}
declare interface IDateDetails extends ICalendarDay {
    date: Date
    calculatedPrices: Record<PriceType, number>
}
declare interface ICalendar {
    basePrice: number
    days: ICalendarDay[]
}
