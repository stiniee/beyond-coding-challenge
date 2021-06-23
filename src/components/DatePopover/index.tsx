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
            <div
                className="date-popover_content"
                style={style}
                data-testid="date-popover"
            >
                <div
                    className="date-popover_header"
                    data-testid="date-popover-header"
                >
                    {data.isBlocked ? (
                        <div className="date-popover_header-blocked-status">
                            BLOCKED
                        </div>
                    ) : null}

                    <div
                        className="date-popover_header-date"
                        data-testid="date-popover-date"
                    >
                        {formatDate(data.date)}
                    </div>
                    <div
                        className="date-popover_header-total"
                        data-testid="date-popover-rate-total"
                    >
                        ${data.rate.total}
                    </div>
                </div>
                <ul
                    className="date-popover_price-details"
                    data-testid="date-popover-price-details"
                >
                    {Object.keys(priceLabels).map((key, index) => {
                        const isPriceIncrease = index > 0 && index < lastIndex
                        const label = priceLabels[key as PriceType]
                        const value = data.rate[key as PriceType]
                        return (
                            <div key={key}>
                                {index === lastIndex ? <hr /> : null}
                                <li
                                    className="date-popover_price-detail"
                                    key={key}
                                >
                                    <div className="price-label"> {label} </div>
                                    <div className="price">
                                        {isPriceIncrease ? '+ ' : ''}
                                        {value >= 0 ? `$${value}` : '--'}
                                    </div>
                                </li>
                            </div>
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
