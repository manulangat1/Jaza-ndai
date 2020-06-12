import React from 'react'
import { connect } from 'react-redux'
import { Redirect,withRouter,Link } from 'react-router-dom'
import { getDriver,getRider } from "../../actions/trips";
import '../styles/main.scss'
class History extends React.Component{
    state = {
        isClicked:false,
        modalOpen: false,
        showing: false,
        messageVisibility: true

    }
    componentDidMount(){
        if(this.props.auth.is_driver){
            this.props.getDriver()
        } else if(this.props.auth.is_rider) {
            this.props.getRider()
        }
    }
    onChange = id => {
        // this.setState({showing:!this.state.showing})
        console.log(id)
            // this.setState({ showing: id }, () => { 
            //   console.log(id)
            //   console.log(this.state.showing) })
            //   this.setState({showing:!this.state.showing})
        const {showing} = this.state
            this.setState({
                showing: {
                  ...showing,
                  [id]: !showing[id]
                }
            })
          
    }
    render(){
        const { trips } = this.props
        const { showing } = this.state
        return(
            <section id="history">
                <div className="container">
                    <div className="hist">
                    {
                     trips && trips.length > 0 ?   trips.map(trip => (
                            <div key={trip.id}>
                                <h1>From : {trip.pick_up_address}  | To:{trip.drop_off_address}</h1>
                                <div>
                    {this.state.showing[trip.id] ? <button className="primary-btn" onClick={() => this.onChange(trip.id)}>View less Details</button> : <button className="primary-btn" onClick={() => this.onChange(trip.id)}>View more Details</button>}
                    { this.state.showing[trip.id]
                        ? <div>
                            {/* <h2>Driver:{trip.driver.username}</h2> */}
                            <p>Capacity: {trip.capacity }</p>
                            <p>From:{trip && trip.pick_up_address}</p>
                            <p>To:{trip.drop_off_address}</p>
                            <p>Cost:{trip.price}</p>
                            <p></p>
                        </div>
                        : null
                    }
                    </div>  
                            </div>
                        )) : "You have not used our services before book a ride to start"
                    }
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    trips:state.trips.tripS,
    auth:state.auth.user
})
export default connect(mapStateToProps,{getDriver,getRider})(History)