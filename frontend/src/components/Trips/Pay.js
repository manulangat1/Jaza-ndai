import React from 'react'
import { tripDetails,loadDriver,completeView ,rateDriver} from '../../actions/trips'
import { joinTrip } from '../../actions/join'
import { connect } from 'react-redux'
import '../styles/main.scss'
import axios from 'axios'
import Driver from './Driver'
import ReactStars from 'react-rating-stars-component'
{/* <a target="_blank" href="http://127.0.0.1:5000/call"  >Call the driver</a> */}
class Pay extends React.PureComponent {
    state = {
        id:0,
        rating:null
    }
    async componentDidMount(){
        if (this.props.id){
           await this.props.tripDetails(this.props.id)
            console.log(this.props.trip.driver)
            if (this.props.id){
                this.setState({id:this.props.id})
            }
        }
    }
    onClick = (e,id) => {
        if (this.props.id){
            // this.props.joinTrip(this.props.id)
            const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
            console.log(this.props.id)
            // const {this.props.id} = id
            this.setState({id:this.props.id})
            id = JSON.stringify({id:this.props.id})
            console.log(id)
            axios.post("/api/payment/",id,config)
            .then(res => res.data)
            .catch(err => console.log(err))
        }
    }

    onComplete = e => {
        if ( this.props.id){
            this.props.completeView(this.props.id)
        }
    }

    ratingChanged = (newRating) => {
        if (this.props.id){
        this.setState({id:this.props.id})
        console.log(this.state.id)
        // const newrating = {
        //     id,
        //     newRating
        // }
        this.props.rateDriver(newRating,this.state.id)
        }
      }
    render(){
        const { trip ,user} = this.props
        const userJoin = (
            <button className="primary-btn" onClick={this.onClick}>Join as a rider</button>
        )
        const btnJoin = (
            <button className="primary-btn" onClick={() => this.onClick(trip.id)}>Pay here</button>
        )
        const driverUpdate = (
            <button className="primary-btn" onClick={this.onComplete}>Completed</button>
        )
        
        return(
            <section id="tripd">
                <div className="container">
                <div className="image">
                    <h1>Driver details</h1>
                    {
                        trip && trip.driver ?  Object.entries(trip.driver).map(([key,value],i) => (
                            <div>
                                {/* <p>{key}:{value}</p> */}
                        { key && key == "pic" ? <img src={value} alt="user image" />: key == "username" ? <p>{key}:{value}</p>: key == "tel_no" ? <p>{key}:{value}</p> :""}
                            </div>
                        ))  : null
                    }
                </div>
                <div className="l">
                <p>Username:{user.username}</p>
                <p>Capacity: {trip.capacity }</p>
                <p>From:{trip && trip.pick_up_address}</p>
                <p>To:{trip.drop_off_address}</p>
                <p>Cost:{trip.price}</p>
                <p>Capacity: {trip.capacity}</p>
                <p>{trip.review}</p>
                {/* {
                     trip && trip.review.map( rev => (
                        <div>
                            <p>{rev.courtesy__avg}</p>
                            <p>hte</p>
                        </div>
                    ))
                } */}
                { user && user.is_rider ? "" : driverUpdate }
                { user && user.is_rider ? btnJoin:""}
                <ReactStars
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        color2={'#ffd700'} />
                </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    id: ownProps.match.params.id,
    trip:state.trips.trip,
    user:state.auth.user,
})
export default connect(mapStateToProps,{tripDetails,joinTrip,loadDriver,completeView,rateDriver}) (Pay)