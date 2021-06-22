import React from 'react'
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
        <div
            id={id}
            className={`listing ${viewType}-view ${className}`}
            style={style}
        >
            {viewType === 'card' ? (
                <>
                    <div>
                        <img src={data.picture} alt={data.picture} />
                        <h2>{data.title}</h2>
                        <div>{data.bed}</div>
                    </div>
                    <div> {data.currency} </div>
                </>
            ) : (
                <>
                    <div>{data.title}</div>
                </>
            )}
        </div>
    )
}

export default Listing
