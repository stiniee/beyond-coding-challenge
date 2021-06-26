import React from 'react'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import { mdiBedKing } from '@mdi/js'
import { getCalculatedScore } from '../../utils/calculation-utils'
import './listing.css'

export interface ListingProps extends DefaultProps {
    data: IListing
    disableLink?: boolean
    onClick?: (data: IListing) => void
}

/**
 * Listing: Represents a rental listing in a card layout
 * @prop data: The listings data
 * @prop disableLink: Disables the Link so it is not routable
 * (includes id, title, picture, health, currency, beds)
 * @returns the Listing component (JSX.Element)
 */
const Listing = ({
    id,
    className,
    style,
    data,
    disableLink,
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
            className={`listing card-view ${className}`}
            style={style}
            onClick={handleClick}
            role="row"
            tabIndex={0}
            data-testid="listing"
        >
            <div className="listing_picture-and-title">
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
                        className={`listing_link${
                            disableLink ? ' disabled' : ''
                        }`}
                        to={{
                            pathname: `/${data.id}`,
                            state: {
                                listingData: data,
                            },
                        }}
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
                        title={`${data.beds} bed${data.beds > 1 ? 's' : ''}`}
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
                            {data.beds}
                        </span>
                    </div>
                </div>
            </div>

            {/* Health Score */}
            <div className="listing_health-container">
                <span className="listing_health" data-testid="listing-health">
                    {getCalculatedScore(data.health)}
                </span>
                <div className="listing_health-label">Health Score</div>
            </div>
        </div>
    )
}

Listing.defaultProps = {
    className: '',
}

export default Listing
