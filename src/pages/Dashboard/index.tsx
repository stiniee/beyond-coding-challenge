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

    const handleFetchListings = async (): Promise<void> => {
        const res = await ListingsApi.getListings()
        setListings(res.listings)
    }
    useEffect(() => {
        handleFetchListings()
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard_listings-container">
                {listings.map((listing) => {
                    return <Listing data={listing} />
                })}
            </div>
        </div>
    )
}

export default Dashboard
