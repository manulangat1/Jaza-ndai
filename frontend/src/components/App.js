import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// store
import store from '../store'
import { Provider } from 'react-redux'

import { HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import { loadUser} from '../actions/auth'
import PrivateRoute from './common/PrivateRoute'
import All from './Trips/All'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Register from './auth/Register'
import Login from './auth/Login'
import AddTrip from './Trips/AddTrip'
import TripDetails from './Trips/TripDetails'
// import Maps from './Maps'
class App extends React.Component {
componentDidMount(){
    store.dispatch(loadUser())
}
render() {
   return (
       <Provider store={store}>
        <Router>
            <main>
                <Header />
                    <Switch>
                        <PrivateRoute exact path="/" component={All} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/add" component={AddTrip} />
                        <PrivateRoute exact path="/trip/:id" component={TripDetails} />
                    </Switch>
                <Footer />
            </main>
       </Router>
       </Provider>
   )
}
}
ReactDOM.render(<App />, document.getElementById('App'));