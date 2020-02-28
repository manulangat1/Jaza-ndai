import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
// import "./app.css";
import './styles/main.scss'
import { getTrips } from '../actions/trips'
import { connect } from 'react-redux'
class Maps extends React.Component{
    componentDidMount(){
        this.props.getTrips()
    }
    render(){
    const position = [51.505, -0.09]
        const {trips } = this.props
        return (
        <section >
            {/* <Map center={[51.505, -0.09]} zoom={13}>
            <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
            {/* { trips && trips.map(trip => (
                <Marker
                key={trip.id}
                position={[parseFloat(trip.geo_location[1]), parseFloat(trip.geo_location[0])]}
              />
            ))} */}
            {/* </Map> */}
            <Map center={position} zoom={13}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
            </Map>
    </section>
        )
    }
}
const mapStateToProps = state => ({
    trips:state.trips.trips
})
export default connect (mapStateToProps,{getTrips})(Maps)