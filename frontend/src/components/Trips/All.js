import React from 'react'
import { getTrips,searchTrips } from '../../actions/trips'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
import { Map, Marker, Popup, TileLayer,Polyline,Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import { Routing } from 'leaflet-routing-machine';
import LoginModal from './LoginModal'
class All extends React.Component {
    state = {
        pick_up_address:'',
        drop_off_address:'',
        modalOpen: false,
        trips:[]
    }        
    static getDerivedStateFromProps(nextProps, prevState){
        // console.log(this.state.trips)
        if(nextProps.trips!==prevState.trips){
            return {trips:nextProps.trips}
        }}
     handleModalOpen = () => {
        this.setState((prevState) => {
           return{
              modalOpen: !prevState.modalOpen
           }
        })
     }
    onChange = e => this.setState({[e.target.name]:e.target.value})
    onSubmit = e => {
        e.preventDefault()
        // console.log("submitted")
        const {pick_up_address,drop_off_address } = this.state
        // console.log(pick_up_address,drop_off_address)
        this.props.searchTrips(pick_up_address,drop_off_address)
        this.setState({pick_up_address:'',
        drop_off_address:'',})
    }
    clearState = e => {
        // this.setState({trips:null})
        // console.log(this.props.trips)
        console.log("State",this.state.trips)
        this.setState({trips:null})
        console.log(this.state.trips)
        
    }
    render(){
        // const{trips} = this.props
        const {trips } = this.state
        const position = [0.0236,37.9062]
        const {pick_up_address,drop_off_address} = this.state
        return(
            <section>
                <LoginModal
                onChange={this.onChange}
                onSubmit = {this.onSubmit}
                modalOpen={this.state.modalOpen}
                handleModalOpen={this.handleModalOpen}
                />
                <Map center={position} zoom={7.3}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    { trips && trips.map(trip => (
                        <div>
                        <Marker
                        key={trip.id}
                        position={[trip.geo_location_lat, trip.geo_location_long]}
                        
                    >
                        <Popup>
                            <p>Price:{trip.price}</p>
                            <Link to={`trip/${trip.id}`} onClick={this.clearState}>Book ride</Link>
                            </Popup>
                        </Marker>
                        {/* <Marker
                        key={trip.id}
                        position={[trip.drop_lat,trip.drop_lng]}
                    >
                        </Marker>
                        <Polygon key={trip.id} positions={[
          [trip.geo_location_lat, trip.geo_location_long], [trip.drop_lat,trip.drop_lng],
        ]} color={'red'} /> */}
                        </div>
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