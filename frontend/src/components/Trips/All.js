import React from 'react'
import { getTrips,searchTrips } from '../../actions/trips'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
class All extends React.Component {
    state = {
        pick_up_address:'',
        drop_off_address:''
    }
    onChange = e => this.setState({[e.target.name]:e.target.value})
    onSubmit = e => {
        e.preventDefault()
        // console.log("submitted")
        const {pick_up_address,drop_off_address } = this.state
        // console.log(pick_up_address,drop_off_address)
        const newSearch ={
            pick_up_address,drop_off_address
        }
        this.props.searchTrips(pick_up_address,drop_off_address)
    }
    render(){
        const{trips} = this.props
        const position = [0.0236,37.9062]
        const {pick_up_address,drop_off_address} = this.state
        return(
            <section>
                <form onSubmit={this.onSubmit}>
                <div>
                <input type="text" value={pick_up_address} onChange={this.onChange} name="pick_up_address"  />
                </div>
                <div>
                <input type="text" value={drop_off_address} onChange={this.onChange} name="drop_off_address"  />
                </div>
                <button>Submit</button>
                </form>
                
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
export default connect(mapStateToProps,{getTrips,searchTrips}) (All)