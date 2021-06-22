const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export const getDayOfYear = (date: any): number => {
    const startDate: any = new Date(date.getFullYear(), 0, 1)
    const dayOfYear = Math.floor((date - startDate) / 1000 / 60 / 60 / 24)
    return dayOfYear
}

export const getDayOfWeekLong = (date: any): string => {
    const dayName = DAYS_OF_WEEK[date.getDay()]
    return dayName
}
