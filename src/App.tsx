import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './routes'
import './styles/main.css'

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                {Object.keys(routes).map((key) => {
                    const route = routes[key]
                    return (
                        <Route
                            key={key}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    )
                })}
            </Switch>
        </Router>
    )
}

export default App
