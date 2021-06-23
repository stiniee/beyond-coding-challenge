import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactCalendar from 'react-calendar'
import DatePopover from '../../components/DatePopover'
import CalendarApi from '../../api/calendar-api'
import { getDayOfWeekLong, getDayOfYear } from '../../utils/date-utils'
import './calendar.css'

/**
 * Displays a listing's calendar that contains
 * all the dates and their information
 * @returns JSX.Element
 */
const Calendar = ({ match }: IRouterProps): JSX.Element => {
    const [calendar, setCalendar] = useState([])
    const [dateDetails, setDateDetails] = useState<IDateDetails | null>(null)
    const tooltipRef = useRef(null)
    const { listingId } = match?.params

    // Gets the calendar data from the api
    const fetchCalendar = async (): Promise<void> => {
        const res = await CalendarApi.getCalendar(listingId)
        setCalendar(res.days)
    }

    // Invoke handler to fetch the calendar data upon mounted
    useEffect(() => {
        fetchCalendar()
    }, [])
    return (
        <div className="calendar" data-testid="calendar-page">
            <Link className="calendar_back-to-listings" to="/">
                Back to listings
            </Link>
            <div className="calendar_calendar-container" data-testid="calendar">
                <ReactCalendar
                    locale="en-US"
                    formatShortWeekday={(locale, date) =>
                        getDayOfWeekLong(date)
                    }
                    tileClassName="calendar_calendar-tile"
                    // Show the total price on each title
                    tileContent={(data: any) => {
                        const dayOfYear = getDayOfYear(data.date)
                        const calendarDay: ICalendarDay = calendar[dayOfYear]
                        const dateInfo: IDateDetails = {
                            date: data.date,
                            ...calendarDay,
                        }
                        return calendarDay ? (
                            <>
                                <div
                                    className={`calendar_calendar-tile-overlay${
                                        calendarDay.isBlocked ? ' blocked' : ''
                                    }`}
                                    ref={tooltipRef}
                                    data-tip
                                    data-for="dateDetails"
                                    onMouseOver={() => setDateDetails(dateInfo)}
                                    onFocus={() => setDateDetails(dateInfo)}
                                />
                                <div>${calendarDay.rate.total}</div>
                            </>
                        ) : null
                    }}
                    showNeighboringMonth={false}
                    prev2Label={null}
                    next2Label={null}
                />
                {dateDetails ? (
                    <DatePopover id="dateDetails" data={dateDetails} />
                ) : null}
            </div>
        </div>
    )
}

export default Calendar
