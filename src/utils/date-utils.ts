const dayjs = require('dayjs')
dayjs.extend(require('dayjs/plugin/dayOfYear'))
dayjs.extend(require('dayjs/plugin/utc'))

/**
 * Converts date to specified format.
 * Default format is mmmm dd, yyyy
 * @param d The date to be formatted
 * @returns the formatted date (string)
 */
export const formatDate = (
    d: string | Date,
    format = 'mmmm dd, yyyy'
): string => {
    return dayjs.utc(d).format(format)
}

/**
 * Gets the day of year index, which is the day's index
 * in respect to the 365 days that makes up a year
 * Indices range from 0 -> 364
 * @param d The date to get the index from
 * @returns the day of year index (integer)
 */
export const getDayOfYearIndex = (d: string | Date): number => {
    return dayjs.utc(d).dayOfYear() - 1
}
