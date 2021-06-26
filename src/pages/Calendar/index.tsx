import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactCalendar from 'react-calendar'
import Icon from '@mdi/react'
import {
    mdiCurrencyUsd,
    mdiCurrencyEur,
    mdiChevronLeft,
    mdiChevronRight,
} from '@mdi/js'
import Listing from '../../components/Listing'
import DatePopover from '../../components/DatePopover'
import Input from '../../components/Input'
import CalendarApi from '../../api/calendar-api'
import { formatDate, getDayOfYearIndex } from '../../utils/date-utils'
import { getCalculatedPrices } from '../../utils/calculation-utils'
import './calendar.css'

/**
 * Calendar: Displays a listing's calendar that contains all the dates and their information
 * @returns the Calendar page component (JSX.Element)
 */
const Calendar = ({ match, location }: IRouterProps): JSX.Element => {
    const [calendar, setCalendar] = useState<ICalendarDay[]>([])
    const [activeStartDate, setActiveStartDate] = useState(undefined)
    const [inputValue, setInputValue] = useState('')
    const [basePrice, setBasePrice] = useState(0)
    const [dateDetails, setDateDetails] = useState<IDateDetails | null>(null)
    const tooltipRef = useRef(null)

    const { listingId } = match?.params
    const { listingData } = location?.state

    /*--------------------------------------------
        Calendar
    ---------------------------------------------*/

    // Gets the calendar data from the api
    const fetchCalendar = async (): Promise<void> => {
        const res = await CalendarApi.getCalendar(listingId)

        setCalendar(res.days)
        setBasePrice(res.basePrice)
        setInputValue(`${res.basePrice}`)
    }

    // Updates the calendar with the new base price
    const updateCalendar = async (value: number): Promise<void> => {
        await CalendarApi.updateCalendar(listingId, {
            basePrice: value,
        })
        await fetchCalendar()
    }

    // Gets the calendar day based on the day of year index
    const getCalendarDay = (date: Date): ICalendarDay => {
        const dayOfYear = getDayOfYearIndex(date)
        const calendarDay: ICalendarDay = calendar[dayOfYear]
        return calendarDay
    }

    // Upon calendar change, update the activeStartDate
    // Which would trigger the react-tooltip to rebuild
    const handleMonthChange = (event: any): void => {
        setActiveStartDate(event.activeStartDate)
    }

    /*--------------------------------------------
        Input
    ---------------------------------------------*/
    const handleChangeInput = (value: string): void => {
        setInputValue(value)
    }

    const handleSubmitInput = async (value: string): Promise<void> => {
        await updateCalendar(parseInt(value, 10))
    }

    /*--------------------------------------------
        On Mounted
    ---------------------------------------------*/

    // Invoke handler to fetch the calendar and listing data upon mounted
    useEffect(() => {
        fetchCalendar()
    }, [])

    return (
        <div className="calendar" data-testid="calendar-page">
            <Link className="calendar_back-to-listings" to="/">
                Back to Listings
            </Link>

            <div className="calendar_calendar-listing-section">
                <Listing
                    className="calendar_listing"
                    data={listingData}
                    disableLink
                />
            </div>

            <div className="calendar_calendar-section">
                {/* Base Price Input */}
                <div
                    className="calendar_base-price-input"
                    data-testid="base-price-input"
                >
                    <label htmlFor="basePriceInput"> Base Price </label>
                    <Input
                        id="basePriceInput"
                        type="number"
                        icon={
                            <Icon
                                path={
                                    listingData.currency.toLowerCase() === 'eur'
                                        ? mdiCurrencyEur
                                        : mdiCurrencyUsd
                                }
                                color="#333333"
                                size={1}
                            />
                        }
                        value={inputValue}
                        onChange={handleChangeInput}
                        onSubmit={handleSubmitInput}
                    />
                </div>

                {/* Calendar */}
                <div
                    className="calendar_calendar-container"
                    data-testid="calendar"
                >
                    <ReactCalendar
                        locale="en-US"
                        formatShortWeekday={(locale, date) =>
                            formatDate(date, 'dddd')
                        }
                        tileDisabled={({ date }) => {
                            // Disable if the calendar day is blocked
                            const calendarDay = getCalendarDay(date)
                            return calendarDay ? calendarDay.isBlocked : true
                        }}
                        tileClassName="calendar_calendar-tile"
                        // Show the total price on each title
                        tileContent={({ date }) => {
                            // Get the calendar day
                            const calendarDay: ICalendarDay =
                                getCalendarDay(date)

                            // Return early if calendar day does not exist
                            if (!calendarDay) return null

                            // Extract the seasonal and dayOfWeek from the factors
                            const { seasonal, dayOfWeek } = calendarDay.factors

                            // Get all the calculated prices using the basePrice and factors
                            const calculatedPrices: Record<PriceType, number> =
                                getCalculatedPrices(
                                    basePrice,
                                    seasonal,
                                    dayOfWeek
                                )

                            // Create the date details object to use for the popover
                            const details: IDateDetails = {
                                ...calendarDay,
                                date,
                                calculatedPrices,
                            }

                            return (
                                <>
                                    <div
                                        className={`calendar_calendar-tile-overlay${
                                            calendarDay.isBlocked
                                                ? ' blocked'
                                                : ''
                                        }`}
                                        ref={tooltipRef}
                                        data-tip
                                        data-for="datePopover"
                                        onMouseOver={() =>
                                            setDateDetails(details)
                                        }
                                        onFocus={() => setDateDetails(details)}
                                    />
                                    <div>
                                        ${calculatedPrices.predictedPrice}
                                    </div>
                                </>
                            )
                        }}
                        showNeighboringMonth={false}
                        prevLabel={
                            <Icon
                                title="Previous Month"
                                path={mdiChevronLeft}
                                color="#9E9E9E"
                                size={1}
                            />
                        }
                        nextLabel={
                            <Icon
                                title="Next Month"
                                path={mdiChevronRight}
                                color="#9E9E9E"
                                size={1}
                            />
                        }
                        prev2Label={null}
                        next2Label={null}
                        onActiveStartDateChange={handleMonthChange}
                    />
                </div>

                {/* Date Popover */}
                {dateDetails ? (
                    <DatePopover
                        id="datePopover"
                        data={dateDetails}
                        data-testid="date-popover"
                        activeStartDate={activeStartDate}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default React.memo(Calendar)
