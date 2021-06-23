const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

/**
 * Converts date to MM DD, YYYY format
 * @param date The date to be formatted
 * @returns formattedDate
 */
export const formatDate = (d: string | Date): string => {
    const date = typeof d === 'string' ? new Date(d) : d
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
    return formattedDate
}

export const getDayOfYear = (d: string | Date): number => {
    const date = typeof d === 'string' ? new Date(d) : d
    const startDate: any = new Date(date.getFullYear(), 0, 1)
    const dayOfYear = Math.floor(
        ((date as any) - startDate) / 1000 / 60 / 60 / 24
    )
    return dayOfYear
}

export const getDayOfWeekLong = (d: string | Date): string => {
    const date = typeof d === 'string' ? new Date(d) : d
    const dayName = DAYS_OF_WEEK[date.getDay()]
    return dayName
}
