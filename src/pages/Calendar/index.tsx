import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactCalendar from 'react-calendar'
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

    const handleChangeCalendar = (value: any, event: any): void => {
        console.log('value: ', value)
        console.log('event: ', event)
    }

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
                    tileContent={(data: any) => {
                        console.log('data: ', data)
                        return <div />
                    }}
                />
            </div>
        </div>
    )
}

export default Calendar
