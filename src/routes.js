// dependencies
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// auth
import { isAuthenticated } from './services/auth'
// loading
import Loading from './components/loading/Loading'
// NotFoundPage
import NotFoundPage from './components/notFoundPage/NotFoundPage'
import Group from './components/group/Group'
import Social from './components/social/Social'

// -pages
const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated()
          ? (
          <Component {...props} />
            )
          : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
      }
    />
)

const Routes = () => (

    <Router>
        <Suspense fallback={Loading}>
          <Switch>

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact path={['/', '/chat/:friend']} component={() => (
              <>
                <Group/>
                <Social/>
                <Home/>
              </>
            )} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </Suspense>
    </Router>
)

export default Routes
