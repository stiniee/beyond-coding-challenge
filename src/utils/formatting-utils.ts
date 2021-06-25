/**
 * Gets the score value from the number
 * @param value The value to calculate the score
 * @param fixed The amount of decimal places to be fixed to
 * @returns the score, which is the value multipled by 100
 */
export const numToScore = (value: number, fixed = 0): string => {
    return (value * 100).toFixed(fixed)
}
