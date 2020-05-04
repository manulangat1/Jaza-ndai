import React from 'react'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
import { getDriver,getRider,transitView } from "../../actions/trips";
class Transit extends React.Component{
    componentDidMount(){
        this.props.transitView()
    }
    render(){
        const { trips } = this.props
        return(
            <section>
                <div className="container">
                    {
                        trips.map(trip => (
                            <div key={trip.id}>
                                <h1> <Link to={`trip/${trip.id}`}>To: {trip.drop_off_address}</Link></h1>
                            </div>
                        ))
                    }
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    trips:state.trips.onT,
    auth:state.auth.user,
})
export default connect(mapStateToProps,{getDriver,getRider,transitView})(Transit)