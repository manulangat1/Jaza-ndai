import React from 'react'
import { getTrips } from '../../actions/trips'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
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
                            <Link to={`trip/${trip.id}`}> <h1>{trip.id}</h1></Link>
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