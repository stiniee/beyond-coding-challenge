import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CalendarApi from '../../api/calendar-api'
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

    const fetchCalendar = async (): Promise<void> => {
        const res = await CalendarApi.getCalendar(listingId)
        console.log('CalendarApi res: ', res)
        setCalendar(res.days)
    }

    useEffect(() => {
        fetchCalendar()
    }, [])
    return (
        <div>
            <Link to="/">Back to listings</Link>
        </div>
    )
}

export default Calendar
