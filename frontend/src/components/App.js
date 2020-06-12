import React, { Component , lazy, Suspense } from 'react';
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
import Profile from './auth/Profile'
import P from './common/P'
import './styles/main.scss'
import Help from './layout/Help'
import Transit from './Trips/Transit'
import Call from './Call'
import  Register_Rider from './auth/Register_Rider'
import About from './layout/About'
import Contact from './layout/Contact'
import Block from './Trips/Block'
import Pay from './Trips/Pay'
// const   AddTrip = lazy(() => import('./Trips/AddTrip')) 
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <section id="app">
                        <PrivateRoute exact path="/" component={All} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/block" component={Block} />
                        <Route exact path="/call" component={Call} />
                        <Route exact path="/help" component={Help} />
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/register/rider" component={Register_Rider} />
                        <PrivateRoute exact path="/add" component={AddTrip} />
                        <PrivateRoute exact path="/trip/:id" component={TripDetails} />
                        <PrivateRoute exact path="/history" component={History} />
                        <PrivateRoute exact path="/pay/:id" component={Pay} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/transit" component={Transit} />
                        </section>
                    </Switch>
                </Suspense>
                <Footer />
            {/* </main> */}
       </Router>
       </Provider>
   )
}
}
ReactDOM.render(<App />, document.getElementById('App'));