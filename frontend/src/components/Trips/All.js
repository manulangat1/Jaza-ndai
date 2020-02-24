import React from 'react'
import { getTrips } from '../../actions/trips'
import { connect } from 'react-redux'
class All extends React.Component {
    componentDidMount(){
        this.props.getTrips()
    }
    render(){
        return(
            <section>
                <p>hdhd</p>
                {
                    this.props.trips.map(trip => 
                        <div key={trip.id}>
                            <h1>{trip.id}</h1>
                            <p>{trip.driver}</p>
                        </div>
                        )
                }
            </section>
        )
    }
}
const mapStateToProps = state => ({
    trips:state.trips.trips
})
export default connect(mapStateToProps,{getTrips}) (All)