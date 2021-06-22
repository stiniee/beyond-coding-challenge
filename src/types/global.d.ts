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

declare interface IListing {
    id: number
    title: string
    picture: string
    ranking: number
    currency: string
    bed: number
}
