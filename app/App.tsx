import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import routes from './routes'
import Layout from './components/Layout'
import './styles/main.css'

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Layout>
                    {Object.keys(routes).map((key) => (
                        <Route key={key} {...routes[key]} />
                    ))}
                </Layout>
            </Switch>
        </Router>
    )
}

export default App
