//dependencies
import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//external files

//-auth
import {isAuthenticated} from './services/auth';

//-pages
const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Chat = lazy(() => import('./pages/Chat/Chat'))
const CountConfig = lazy(() => import('./pages/CountConfig/CountConfig'))




//component

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
);

const Routes = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>

            <Route exact path="/login" component={Login} />           
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/chat/:friend" component={Chat} />
            <PrivateRoute exact path="/config" component={CountConfig} />   

          </Switch>
        </Suspense>
    </Router>
)

export default Routes