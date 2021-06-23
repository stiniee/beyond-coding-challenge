export const numToScore = (value: number, fixed = 0): string => {
    return (value * 100).toFixed(fixed)
}
