import React, { useState, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiMenuDown, mdiMenuUp } from '@mdi/js'
import Listing from '../../components/Listing'
import ListingsApi from '../../api/listings-api'
import './dashboard.css'

// interface DashboardProps {}

/**
 * Displays a list of all the user's listings with a link to the calendar
 * @returns JSX.Element
 */
const Dashboard = (): JSX.Element => {
    const [listings, setListings] = useState([])
    const [sortHealth, setSortHealth] = useState<string | null>(null)

    /*--------------------------------------------------------------------
        Listings
    ---------------------------------------------------------------------*/

    // Gets the listings data from the api, sorted by health
    const fetchListings = async (): Promise<void> => {
        const res = await ListingsApi.getListings()
        if (sortHealth) {
            res.listings.sort((a: IListing, b: IListing) => {
                if (sortHealth === 'asc') return a.health - b.health
                return b.health - a.health
            })
        }
        setListings(res.listings)
    }

    // Invoke handler to fetch the listings upon mounted or sortHealth update
    useEffect(() => {
        fetchListings()
    }, [sortHealth])

    /*--------------------------------------------------------------------
        Sort by Health
    ---------------------------------------------------------------------*/

    // Handles setting health sort order to 'asc', 'desc', or toggled off
    const handleSetSortHealth = (sortOrder: string): void => {
        // If already active, toggle off
        if (sortHealth === sortOrder) setSortHealth(null)
        // Otherwise set to the sort order
        else setSortHealth(sortOrder)
    }

    return (
        <div className="dashboard" data-testid="dashboard-page">
            {listings.length ? (
                <div className="dashboard_listings">
                    <div
                        className={`dashboard_listings-header${
                            sortHealth !== null ? ' active' : ''
                        }`}
                    >
                        <div className="dashboard_listings-header-health-label">
                            Health
                        </div>
                        <div className="dashboard_listings-sort">
                            <div
                                className={`dashboard_sort-icon caret-up-icon ${
                                    sortHealth === 'desc' ? ' active' : ''
                                }`}
                                role="button"
                                tabIndex={0}
                                onKeyDown={() => handleSetSortHealth('desc')}
                                onClick={() => handleSetSortHealth('desc')}
                            >
                                <Icon
                                    path={mdiMenuUp}
                                    color={
                                        sortHealth === 'desc'
                                            ? '#0E979F'
                                            : '#B8B8B9'
                                    }
                                    size={1}
                                />
                            </div>
                            <div
                                className={`dashboard_sort-icon caret-down-icon ${
                                    sortHealth === 'asc' ? ' active' : ''
                                }`}
                                role="button"
                                tabIndex={0}
                                onKeyDown={() => handleSetSortHealth('asc')}
                                onClick={() => handleSetSortHealth('asc')}
                            >
                                <Icon
                                    path={mdiMenuDown}
                                    color={
                                        sortHealth === 'asc'
                                            ? '#0E979F'
                                            : '#B8B8B9'
                                    }
                                    size={1}
                                />
                            </div>
                        </div>
                    </div>
                    <ul className="dashboard_listings-container">
                        {listings.map((listing: IListing) => {
                            return (
                                // List out each listing with its data passed in
                                <li key={listing.id}>
                                    <Listing data={listing} key={listing.id} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default Dashboard
