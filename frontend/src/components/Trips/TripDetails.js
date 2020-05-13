import React from 'react'
import { tripDetails,loadDriver,completeView } from '../../actions/trips'
import { joinTrip } from '../../actions/join'
import { connect } from 'react-redux'
import '../styles/main.scss'
{/* <a target="_blank" href="http://127.0.0.1:5000/call"  >Call the driver</a> */}
class TripDetails extends React.PureComponent {
    componentDidMount(){
        if (this.props.id){
            this.props.tripDetails(this.props.id)
            if (this.props.trip ){
                console.log(this.props.trip.driver)
                this.props.loadDriver(this.props.trip.driver)
            }
        }
    }
    onClick = e => {
        if (this.props.id){
            this.props.joinTrip(this.props.id)
        }
    }
    onDriver = e => this.props.loadDriver(trip.driver)
    onComplete = e => {
        if ( this.props.id){
            this.props.completeView(this.props.id)
        }
    }
    userStatus = user => {
            console.log(userJoin)
    }
    render(){
        const { trip ,user} = this.props
        const userJoin = (
            <button className="primary-btn" onClick={this.onClick}>Join as a rider</button>
        )
        const btnJoin = (
            <button className="primary-btn" onClick={this.onClick}>Join as a rider and call driver </button>
        )
        const driverUpdate = (
            <button className="primary-btn" onClick={this.onComplete}>Completed</button>
        )
        
        return(
            <section id="tripd">
                <div className="container">
                <div className="image">
                    <p onClick={this.OnDriver}>{trip && trip.driver} </p>
                    {/* <p>{trip && trip.driver.phone_no}</p> */}
                </div>
                <div className="l">
                <p>Username:{user.username}</p>
                <p>Capacity: {trip.capacity }</p>
                <p>From:{trip && trip.pick_up_address}</p>
                <p>To:{trip.drop_off_address}</p>
                <p>Cost:{trip.price}</p>
                <p>Capacity: {trip.capacity}</p>
                {/* { user && user.rider  ?   (user.rider == true && trip.rider.length === trip.capacity ? "Car is full" : btnJoin) : "" } */}
                {/* { user.rider == true && trip.rider.length === trip.capacity ? "Car is full" : btnJoin} */}
                { user && user.is_rider ? "" : driverUpdate }
                { user && user.is_rider ? btnJoin:""}
                </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    id: ownProps.match.params.id,
    trip:state.trips.trip,
    user:state.auth.user
})
export default connect(mapStateToProps,{tripDetails,joinTrip,loadDriver,completeView}) (TripDetails)