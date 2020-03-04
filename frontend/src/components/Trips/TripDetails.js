import React from 'react'
import { tripDetails,loadDriver } from '../../actions/trips'
import { joinTrip } from '../../actions/join'
import { connect } from 'react-redux'
import '../styles/main.scss'
class TripDetails extends React.Component {
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
    render(){
        const { trip ,user} = this.props
        return(
            <section id="tripd">
                <div className="container">
                <div className="image">
                    <p onClick={this.OnDriver}>{trip && trip.driver} </p>

                </div>
                <div className="l">
                <p>{user.username}</p>
                <p>Capacity: {trip.capacity }</p>
                <p>From:{trip && trip.pick_up_address}</p>
                <p>To:{trip.drop_off_address}</p>
                <p>Cost:{trip.price}</p>
                {/* <p>{trip.driver}</p> */}
                <button onClick={this.onClick}>Join as a rider</button>
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
export default connect(mapStateToProps,{tripDetails,joinTrip,loadDriver}) (TripDetails)