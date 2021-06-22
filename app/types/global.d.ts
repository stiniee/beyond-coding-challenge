/* General */

declare type Route = Record<string, any>

// Stands for Deep Partial.
// Maps all the properties of some type "T" as optional
declare type DP<T> = {
    [P in keyof T]?: DP<T[P]>
}
