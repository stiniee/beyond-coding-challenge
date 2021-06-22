import React, { useState, useEffect } from 'react'
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

    const handleFetchListings = async (): Promise<void> => {
        const res = await ListingsApi.getListings()
        setListings(res.listings)
    }
    useEffect(() => {
        handleFetchListings()
    }, [])

    return (
        <div>
            Dashboard
            {listings.map((listing) => {
                return <Listing data={listing} />
            })}
        </div>
    )
}

export default Dashboard
