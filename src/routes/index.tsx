import Dashboard from '../pages/Dashboard'
import Calendar from '../pages/Calendar'

const DashboardRoute = {
    exact: true,
    path: '/',
    component: Dashboard,
}

const CalendarRoute = {
    exact: true,
    path: '/:listingId',
    component: Calendar,
}

const routes: Record<string, Route> = {
    DashboardRoute,
    CalendarRoute,
}

export default routes
