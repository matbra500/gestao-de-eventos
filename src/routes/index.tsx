import { Switch, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import Register from "../pages/Register"
import Login from "../pages/Login"
import DashboardHome from "../pages/Dashboard-Home"
import DashboardUserEvents from "../pages/Dashboard-UserEvents"

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/dashboard" component={DashboardHome}/>
            <Route path="/dashboard/myevents" component={DashboardUserEvents}/>
        </Switch>

    )
}

export default Routes