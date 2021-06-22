import React from 'react'
import Icon from '@mdi/react'
import { mdiBedKing } from '@mdi/js'
import { Tr, Td } from '@chakra-ui/react'
import './listing.css'

interface ListingProps extends DefaultProps {
    data: IListing
    viewType?: 'card' | 'table'
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
        <Tr
            id={id}
            className={`listing ${viewType}-view ${className}`}
            style={style}
            onClick={handleClick}
        >
            {viewType === 'card' ? (
                <>
                    <Td>
                        {/* Picture */}
                        <img
                            className="listing_picture"
                            src={data.picture}
                            alt={data.picture}
                        />
                    </Td>
                    <Td>
                        {/* Title */}
                        <div className="listing_title">{data.title}</div>

                        {/* Bed */}
                        <Icon
                            className="listing_bed-icon"
                            path={mdiBedKing}
                            color="#B8B8B9"
                            size={1}
                        />
                        <span className="listing_bed-count"> {data.bed} </span>
                    </Td>
                </>
            ) : (
                <>
                    <Td>
                        {/* Title */}
                        <div className="listing_title">{data.title}</div>
                    </Td>
                    <Td>
                        {/* Bed */}
                        <div className="listing_bed">{data.bed} bedrooms</div>
                    </Td>
                </>
            )}
        </Tr>
    )
}

Listing.defaultProps = {
    className: '',
    viewType: 'card',
}

export default Listing
