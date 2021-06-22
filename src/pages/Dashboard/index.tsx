import React, { useState, useEffect } from 'react'
import { Table, Thead, Tbody, Th, Tr } from '@chakra-ui/react'
import Listing from '../../components/Listing'
import ListingsApi from '../../api/listings-api'
import './dashboard.css'

// interface DashboardProps {}

const LISTING_HEADERS = {}
/**
 * Displays a list of all the user's listings with a link to the calendar
 * @returns JSX.Element
 */
const Dashboard = (): JSX.Element => {
    const [listings, setListings] = useState([])

    // Gets the listings data from the api
    const fetchListings = async (): Promise<void> => {
        const res = await ListingsApi.getListings()
        setListings(res.listings)
    }

    // Invoke handler to fetch the listings upon mounted
    useEffect(() => {
        fetchListings()
    }, [])

    return (
        <div className="dashboard">
            {listings.length ? (
                <div className="dashboard_listings">
                    <div className="dashboard_listings-header">
                        {/* API response is not paginated, 
                        so we simply show all listings */}
                        Showing {listings.length}/{listings.length} Listings
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
