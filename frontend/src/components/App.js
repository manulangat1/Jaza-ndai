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
import History from './Trips/History'
import Maps from './Maps'
import './styles/main.scss'
class App extends React.Component {
componentDidMount(){
    store.dispatch(loadUser())
}
render() {
   return (
       <Provider store={store}>
        <Router>
            {/* <main className="map"> */}
                <Header />
                    <Switch>
                        <section id="app">
                        <PrivateRoute exact path="/" component={All} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/add" component={AddTrip} />
                        <PrivateRoute exact path="/trip/:id" component={TripDetails} />
                        <PrivateRoute exact path="/history" component={History} />
                        </section>
                    </Switch>
                <Footer />
            {/* </main> */}
       </Router>
       </Provider>
   )
}
}
ReactDOM.render(<App />, document.getElementById('App'));