import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { formatDate } from '../../utils/date-utils'
import './date-popover.css'

interface DatePopoverProps extends DefaultProps {
    data: IDateDetails
}

const priceLabels: Record<PriceType, any> = {
    seasonal: 'Seasonality',
    dayOfWeek: 'Day of week',
}
const lastIndex = Object.keys(priceLabels).length - 1

/**
 * Popover that displays the date details
 * @prop data: The date details
 * (includes the date, isBlocked, and factors)
 * @returns JSX.Element
 */
const DatePopover = ({
    id,
    className,
    style,
    data,
}: DatePopoverProps): JSX.Element => {
    console.log('DatePopover data: ', data)
    return (
        <ReactTooltip
            id={id}
            className={`date-popover ${className}`}
            backgroundColor="#000000"
        >
            <div>hi</div>
        </ReactTooltip>
    )
}

DatePopover.defaultProps = {
    className: '',
}

export default DatePopover
