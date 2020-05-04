import React from 'react'
import { connect } from 'react-redux'
import { AddTrips } from '../../actions/trips'
import { Redirect,withRouter } from 'react-router-dom'
import '../styles/main.scss';
class AddTrip extends React.Component{
    state = {
        pick_up_address:'',
        drop_off_address:'',
        // status:'',
        capacity:'',
        date:''
    }
    onChange = e => this.setState({[e.target.name]:e.target.value})
    onSubmit = e => {
        e.preventDefault()
        const {pick_up_address,drop_off_address,capacity,date} = this.state
        const newTrip ={
            pick_up_address,drop_off_address,capacity,date
        }
        this.props.AddTrips(newTrip)
        console.log('submitted')
        // this.props.history.push('/')
        this.setState({
            pick_up_address:'',
            drop_off_address:'',
            // status:'',
            capacity:'',
            date:''
        })
    }
    render(){
        if (this.props.auth.user.is_rider){
            return <Redirect to="/" />
        }
        const {pick_up_address,drop_off_address,capacity,date} = this.state
        return (
            <section id="add">
                <div className="container">
                <form onSubmit={this.onSubmit} className="classForm">
                    <div>
                        <label>From</label>
                        <input type="text" required value={pick_up_address} className="form-control" onChange={this.onChange} name="pick_up_address"  />
                    </div>
                    <div>
                        <label>drop_off_address</label>
                        <input type="text" required value={drop_off_address} className="form-control" onChange={this.onChange} name="drop_off_address"  />
                    </div> 
                    <div>
                        <label>Capacity</label>
                        <input type="number" required value={capacity} className="form-control" onChange={this.onChange} name="capacity"  />
                    </div>
                    <div>
                        <label>Take off</label>
                        <input type="time" required value={date} className="form-control" onChange={this.onChange} name="date"  />
                    </div>
                    <button className="primary-btn"> Add Trips </button>
                </form>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps , {AddTrips})(AddTrip)