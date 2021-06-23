export const numToPercent = (value: number, fixed = 0): string => {
    return (value * 100).toFixed(fixed)
}
