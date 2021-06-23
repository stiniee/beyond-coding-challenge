import React from 'react'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import { mdiBedKing, mdiChevronDoubleUp } from '@mdi/js'
import { numToPercent } from '../../utils/formatting-utils'
import './listing.css'

export interface ListingProps extends DefaultProps {
    data: IListing
    viewType?: 'card' | 'details'
    onClick?: (data: IListing) => void
}

/**
 * Represents a rental listing
 * @prop data: The listings data
 * @prop viewType: The listing view type: card or table
 * (includes id, title, picture, ranking, currency, bed)
 * @returns
 */
const Listing = ({
    id,
    className,
    style,
    data,
    viewType,
    onClick,
}: ListingProps): JSX.Element => {
    // Handles click event on the listing
    const handleClick = (): void => {
        if (onClick) onClick(data)
    }

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            id={id}
            className={`listing ${viewType}-view ${className}`}
            style={style}
            onClick={handleClick}
            role="row"
            tabIndex={0}
            data-testid="listing"
        >
            {viewType === 'card' ? (
                <>
                    {/* Picture */}
                    <img
                        className="listing_picture"
                        src={data.picture}
                        alt={data.picture}
                        data-testid="listing-picture"
                    />

                    <div>
                        {/* Title (Links to the associated calendar) */}
                        <Link
                            to={`/${data.id}`}
                            data-testid="listing-title-link"
                        >
                            <h2
                                className="listing_title"
                                data-testid="listing-title"
                            >
                                {data.title}
                            </h2>
                        </Link>

                        {/* Bed */}
                        <div
                            className="listing_stat"
                            title={`${data.bed} bed${data.bed > 1 ? 's' : ''}`}
                        >
                            <Icon
                                className="listing_bed-icon"
                                path={mdiBedKing}
                                color="#B8B8B9"
                                size={1}
                            />
                            <span
                                className="listing_bed-count"
                                data-testid="listing-bed-count"
                            >
                                {data.bed}
                            </span>
                        </div>

                        {/* Ranking */}
                        <div className="listing_stat">
                            <Icon
                                className="listing_ranking-icon"
                                path={mdiChevronDoubleUp}
                                color="#B8B8B9"
                                size={1}
                            />
                            <span
                                className="listing_ranking-percent"
                                data-testid="listing-ranking"
                            >
                                {numToPercent(data.ranking)}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Title */}
                    <h3 className="listing_title" data-testid="listing-title">
                        {data.title}
                    </h3>

                    {/* Bed */}
                    <div
                        className="listing_bed"
                        data-testid="listing-bed-count"
                    >
                        {data.bed} bedrooms
                    </div>
                </>
            )}
        </div>
    )
}

Listing.defaultProps = {
    className: '',
    viewType: 'card',
}

export default Listing
