import React from 'react'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
import { getDriver,getRider } from "../../actions/trips";
class History extends React.Component{
    componentDidMount(){
        if(this.props.auth.is_driver){
            this.props.getDriver()
        } else if(this.props.auth.is_rider) {
            this.props.getRider()
        }
    }
    render(){
        const { trips } = this.props
        return(
            <section>
                <div className="container">
                    {
                        trips.map(trip => (
                            <div key={trip.id}>
                                <h1>{trip.drop_off_address}</h1>
                            </div>
                        ))
                    }
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    trips:state.trips.trips,
    auth:state.auth.user
})
export default connect(mapStateToProps,{getDriver,getRider})(History)