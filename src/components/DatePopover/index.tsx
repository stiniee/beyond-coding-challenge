import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { formatDate } from '../../utils/date-utils'
import './date-popover.css'

interface DatePopoverProps extends DefaultProps {
    data: IDateDetails
}

const priceLabels: Record<PriceType, any> = {
    basePrice: 'Base',
    seasonal: 'Seasonality',
    dayOfWeek: 'Day of week',
    predictedPrice: 'Predicted Price',
}

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
                    <div
                        className="date-popover_header-date"
                        data-testid="date-popover-date"
                    >
                        {formatDate(data.date)}
                    </div>
                    <div
                        className="date-popover_header-total"
                        data-testid="date-popover-factors-total"
                    >
                        ${data.calculatedPrices.predictedPrice}
                    </div>
                </div>
                <ul
                    className="date-popover_price-details"
                    data-testid="date-popover-price-details"
                >
                    {Object.keys(priceLabels).map((key, index) => {
                        const label = priceLabels[key as PriceType]
                        const isFactor =
                            key === 'seasonal' || key === 'dayOfWeek'
                        const isPredictedPrice = key === 'predictedPrice'
                        const value = `${
                            data.calculatedPrices[key as PriceType]
                        }`
                        return (
                            <div key={key}>
                                {isPredictedPrice ? <hr /> : null}
                                <li
                                    className="date-popover_price-detail"
                                    key={key}
                                >
                                    <div
                                        className={`date-popover_price${
                                            isPredictedPrice ? ' predicted' : ''
                                        }`}
                                    >
                                        {isFactor ? (
                                            '+ '
                                        ) : (
                                            <span>&nbsp;&nbsp;&nbsp;</span>
                                        )}
                                        $
                                        <span
                                            className={`price-digits-${value.length}`}
                                        >
                                            {value}
                                        </span>
                                    </div>
                                    <div className="price-label"> {label} </div>
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
