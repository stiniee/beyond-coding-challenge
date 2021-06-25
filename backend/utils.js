const Moment = require('moment')
const MomentRange = require('moment-range')

const moment = MomentRange.extendMoment(Moment)

const generateDay = (day) => {
    const sign = Math.round(Math.random()) ? 1 : -1
    return {
        date: day.toISOString().slice(0, 10),
        isBlocked: Math.random() < 0.05,
        factors: {
            seasonal: sign * parseFloat(Math.random().toFixed(2)),
            dayOfWeek: sign * parseFloat(Math.random().toFixed(2)),
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
