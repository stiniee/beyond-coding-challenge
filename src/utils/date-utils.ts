import moment from 'moment'
/**
 * Converts date to MM DD, YYYY format
 * @param d The date to be formatted
 * @returns formattedDate
 */
export const formatDate = (d: string | Date): string => {
    return moment(d).utcOffset(0, false).format('MMMM DD, YYYY')
}

/**
 * Gets the day of year index, which is the day's index
 * in respect to the 365 days that makes up a year
 * @param d The date to get the index from
 * @returns dayOfYear: the day of year index (integer)
 */
export const getDayOfYearIndex = (d: string | Date): number => {
    const date = typeof d === 'string' ? new Date(d) : d
    const startDate: any = new Date(date.getFullYear(), 0, 1)
    const dayOfYear = Math.floor(
        ((date as any) - startDate) / 1000 / 60 / 60 / 24
    )
    return dayOfYear
}

/**
 * Gets the full name of the day of week
 * @param d The date to get which day of the week from
 * @returns dayName: the full day name
 */
export const getDayOfWeekLong = (d: string | Date): string => {
    return moment(d).utcOffset(0, false).format('DDDD')
}
