const dayjs = require('dayjs')
dayjs.extend(require('dayjs/plugin/dayOfYear'))

/**
 * Converts date to specified format.
 * Default format is MMMM DD, YYYY
 * @param d The date to be formatted
 * @returns the formatted date (string)
 */
export const formatDate = (
    d: string | Date,
    format = 'MMMM DD, YYYY'
): string => {
    return dayjs(d).format(format)
}

/**
 * Gets the day of year index, which is the day's index
 * in respect to the 365 days that makes up a year
 * Indices range from 0 -> 364
 * @param d The date to get the index from
 * @returns the day of year index (integer)
 */
export const getDayOfYearIndex = (d: string | Date): number => {
    return dayjs(d).dayOfYear() - 1
}
