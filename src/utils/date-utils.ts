export const getDayOfYear = (date: any): number => {
    const startDate: any = new Date(date.getFullYear(), 0, 0)
    const dayOfYear = Math.floor((date - startDate) / 1000 / 60 / 60 / 24)
    return dayOfYear
}
