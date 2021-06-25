const Moment = require('moment')
const MomentRange = require('moment-range')

const moment = MomentRange.extendMoment(Moment)

const generateDay = (day) => {
    const sign = Math.round(Math.random()) ? 1 : -1
    let seasonal = 0
    let dayOfWeek = 0
    if (sign > 0) {
        seasonal = parseFloat(Math.random().toFixed(2))
        dayOfWeek = parseFloat(Math.random().toFixed(2))
    } else {
        // Only allow deduction of values between 0 and 0.3
        seasonal = parseFloat(-(Math.random() * (0.3 - 0)).toFixed(2))
        dayOfWeek = parseFloat(-(Math.random() * (0.3 - 0)).toFixed(2))
    }

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
