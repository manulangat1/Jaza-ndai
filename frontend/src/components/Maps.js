import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
// import "./app.css";
import './styles/main.scss'
import { getTrips } from '../actions/trips'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
class Maps extends React.Component{
    componentDidMount(){
        this.props.getTrips()
    }
    render(){
    const position = [0.0236,37.9062]
        const {trips } = this.props
        return (
        <section >
            <Map center={position} zoom={6}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    { trips && trips.map(trip => (
                        <Marker
                        key={trip.id}
                        position={[trip.geo_location_lat, trip.geo_location_long]}
                    >
                        <Popup>
                            <p>{trip.price}</p>
                            <Link to={`trip/${trip.id}`}>Book ride</Link>
                            </Popup>
                        </Marker>
                    ))}
            </Map>
    </section>
        )
    }
}
const mapStateToProps = state => ({
    trips:state.trips.trips
})
export default connect (mapStateToProps,{getTrips})(Maps)