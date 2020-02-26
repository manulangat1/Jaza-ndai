import React from 'react'
import { tripDetails } from '../../actions/trips'
import { joinTrip } from '../../actions/join'
import { connect } from 'react-redux'
class TripDetails extends React.Component {
    componentDidMount(){
        if (this.props.id){
            this.props.tripDetails(this.props.id)
        }
    }
    onClick = e => {
        if (this.props.id){
            this.props.joinTrip(this.props.id)
        }
    }
    render(){
        const { trip } = this.props
        return(
            <section>
                <h1>h</h1>
                <p>{trip && trip.pick_up_address}</p>
                <p>{trip.driver}</p>
                <p>{trip.rider}</p>
                <button onClick={this.onClick}>Join as a rider</button>
            </section>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    id: ownProps.match.params.id,
    trip:state.trips.trip
})
export default connect(mapStateToProps,{tripDetails,joinTrip}) (TripDetails)