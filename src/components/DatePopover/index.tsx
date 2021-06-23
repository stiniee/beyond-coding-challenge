import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { formatDate } from '../../utils/date-utils'
import './date-popover.css'

interface DatePopoverProps extends DefaultProps {
    data: IDateDetails
}

const priceLabels: Record<PriceType, any> = {
    base: 'Base',
    seasonal: 'Seasonality',
    DOW: 'Day of week',
    total: 'Predicted price',
}
const lastIndex = Object.keys(priceLabels).length - 1

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
        <ReactTooltip
            id={id}
            className={`date-popover ${className}`}
            backgroundColor="#000000"
        >
            <div className="date-popover_content" style={style}>
                <div className="date-popover_header">
                    {data.isBlocked ? (
                        <div className="date-popover_header-blocked-chip">
                            BLOCKED
                        </div>
                    ) : null}

                    <div className="date-popover_header-date">
                        {formatDate(data.date)}
                    </div>
                    <div className="date-popover_header-total">
                        ${data.rate.total}
                    </div>
                </div>
                <ul className="date-popover_details">
                    {Object.keys(priceLabels).map((key, index) => {
                        const isPriceIncrease = index > 0 && index < lastIndex
                        const label = priceLabels[key as PriceType]
                        const value = data.rate[key as PriceType]
                        return (
                            <>
                                {index === lastIndex ? <hr /> : null}
                                <li className="date-popover_detail" key={key}>
                                    <div> {label} </div>
                                    <div>
                                        {isPriceIncrease ? '+ ' : ''}
                                        {value ? `$${value}` : '--'}
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
        </ReactTooltip>
    )
}

DatePopover.defaultProps = {
    className: '',
}

export default DatePopover
