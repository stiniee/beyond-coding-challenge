import React from 'react'
import ReactTooltip from 'react-tooltip'
import { formatDate } from '../../utils/date-utils'
import './date-popover.css'

interface DatePopoverProps extends DefaultProps {
    data: IDateDetails
}

/**
 * Popover that displays the date details
 * @prop data: The date details
 * (includes the date, dateOffset, isBlocked, and rate)
 * @returns JSX.Element
 */
const DatePopover = ({
    id,
    className,
    style,
    data,
}: DatePopoverProps): JSX.Element => {
    return (
        <ReactTooltip id={id} className={`date-popover ${className}`}>
            <div className="calendar_calendar-tooltip" style={style}>
                <div className="calendar_calendar-tooltip-header">
                    <div>{formatDate(data.date)}</div>
                    <div>${data.rate.total}</div>
                </div>
                <div className="calendar_calendar-tooltip-stats">
                    <div />
                </div>
            </div>
        </ReactTooltip>
    )
}

DatePopover.defaultProps = {
    className: '',
}

export default DatePopover
