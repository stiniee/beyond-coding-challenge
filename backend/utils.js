const Moment = require('moment')
const MomentRange = require('moment-range')

const moment = MomentRange.extendMoment(Moment)

const getFactorValue = (sign) => {
    if (sign > 0) return parseFloat(Math.random().toFixed(2))
    // Only allow deduction of values between 0 and 0.3
    return parseFloat(-(Math.random() * (0.3 - 0)).toFixed(2))
}

const generateDay = (day) => {
    const sign1 = Math.round(Math.random()) ? 1 : -1
    const sign2 = Math.round(Math.random()) ? 1 : -1

    const seasonal = getFactorValue(sign1)
    const dayOfWeek = getFactorValue(sign2)

    return {
        date: day.toISOString().slice(0, 10),
        isBlocked: Math.random() < 0.05,
        factors: {
            seasonal,
            dayOfWeek,
        },
    }
}

const createCalendarDays = () => {
    const range = moment().range(moment(), moment().add(1, 'year'))
    const days = Array.from(range.by('days'))

    return days.map((date) => generateDay(date))
}

exports.initState = () => ({
    listings: [
        { days: createCalendarDays(), basePrice: 100 },
        { days: createCalendarDays(), basePrice: 200 },
        { days: createCalendarDays(), basePrice: 300 },
    ],
})
