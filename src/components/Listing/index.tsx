import React from 'react'
import Icon from '@mdi/react'
import { mdiBedKing } from '@mdi/js'
import { Tr, Td } from '@chakra-ui/react'
import './listing.css'

interface ListingProps extends DefaultProps {
    data: IListing
    viewType?: 'card' | 'table'
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
}: ListingProps): JSX.Element => {
    return (
        <Tr
            id={id}
            className={`listing ${viewType}-view ${className}`}
            style={style}
        >
            {viewType === 'card' ? (
                <>
                    <Td>
                        <img
                            className="listing_picture"
                            src={data.picture}
                            alt={data.picture}
                        />
                    </Td>
                    <Td>
                        <div className="listing_title">{data.title}</div>
                        {/* Issue Comments Icon */}
                        <Icon
                            className="listing_bed"
                            path={mdiBedKing}
                            color="#B8B8B9"
                            size={1}
                        />
                    </Td>
                    <Td>
                        <div className="listing_currency">{data.currency}</div>
                    </Td>
                </>
            ) : (
                <>
                    <Td>
                        <div className="listing_title">{data.title}</div>
                    </Td>
                    <Td>
                        <div className="listing_bed">{data.bed} bedrooms</div>
                    </Td>
                </>
            )}
        </Tr>
    )
}

export default Listing
