import React from 'react'
import { connect } from 'react-redux'
import { AddTrips } from '../../actions/trips'
import { Redirect,withRouter } from 'react-router-dom'
class AddTrip extends React.Component{
    state = {
        pick_up_address:'',
        drop_off_address:'',
        status:'',
        capacity:''
    }
    onChange = e => this.setState({[e.target.name]:e.target.value})
    onSubmit = e => {
        e.preventDefault()
        const {pick_up_address,drop_off_address,status,capacity} = this.state
        const newTrip ={
            pick_up_address,drop_off_address,status,capacity
        }
        this.props.AddTrips(newTrip)
        console.log('submitted')
        this.props.history.push('/')
    }
    render(){
        const {pick_up_address,drop_off_address,status,capacity} = this.state
        return (
            <section>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>From</label>
                        <input type="text" value={pick_up_address} onChange={this.onChange} name="pick_up_address"  />
                    </div>
                    <div>
                        <label>drop_off_address</label>
                        <input type="text" value={drop_off_address} onChange={this.onChange} name="drop_off_address"  />
                    </div>
                    <div>
                        <label>status</label>
                        <input type="text" value={status} onChange={this.onChange} name="status"  />
                    </div>
                    <div>
                        <label>Capacity</label>
                        <input type="number" value={capacity} onChange={this.onChange} name="capacity"  />
                    </div>
                    <button> Add Trips </button>
                    {/* <Link to="/register">Register</Link> */}
                </form>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps , {AddTrips})(AddTrip)