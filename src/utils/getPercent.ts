export default (value: number, fixed = 0): string => {
    return `${(value * 100).toFixed(fixed)}%`
}
