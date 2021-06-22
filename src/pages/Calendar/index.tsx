import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactCalendar from 'react-calendar'
import CalendarApi from '../../api/calendar-api'
import { calculatePrice } from '../../utils/calculation-utils'
import { getDayOfWeekLong, getDayOfYear } from '../../utils/date-utils'
import './calendar.css'

// interface CalendarProps {}

/**
 * Displays a listing's calendar that contains
 * all the dates and their information
 * @returns JSX.Element
 */
const Calendar = ({ match }: IRouterProps): JSX.Element => {
    const [calendar, setCalendar] = useState([])
    const { listingId } = match?.params

    // Gets the calendar data from the api
    const fetchCalendar = async (): Promise<void> => {
        const res = await CalendarApi.getCalendar(listingId)
        console.log('CalendarApi res: ', res)
        setCalendar(res.days)
    }

    const handleChangeCalendar = (value: any, event: any): void => {
        console.log('value: ', value)
        console.log('event: ', event)
    }

    // Invoke handler to fetch the calendar data upon mounted
    useEffect(() => {
        fetchCalendar()
    }, [])
    return (
        <div className="calendar">
            <Link className="calendar_back-to-listings" to="/">
                Back to listings
            </Link>
            <div className="calendar_calendar-container">
                <ReactCalendar
                    locale="en-US"
                    formatShortWeekday={(locale, date) =>
                        getDayOfWeekLong(date)
                    }
                    tileClassName="calendar_calendar-tile"
                    // Show the total price on each title
                    tileContent={(data: any) => {
                        const dayOfYear = getDayOfYear(data.date)
                        const date: ICalendarDay = calendar[dayOfYear]
                        return date ? <div>${date.rate.total}</div> : null
                    }}
                    prevLabel={null}
                    prev2Label={null}
                    nextLabel={null}
                    next2Label={null}
                />
            </div>
        </div>
    )
}

export default Calendar
