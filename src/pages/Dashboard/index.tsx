import React, { useState, useEffect } from 'react'
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
        console.log('res: ', res)
    }
    useEffect(() => {
        handleFetchListings()
    }, [])

    return <div> Dashboard </div>
}

export default Dashboard
