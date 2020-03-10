import React from 'react';
import Modal from 'react-responsive-modal';
import { Redirect,withRouter } from 'react-router-dom'
import { getTrips,searchTrips } from '../../actions/trips'
import { connect } from 'react-redux'
class LoginModal extends React.Component{
  state = {
    pick_up_address:'',
    drop_off_address:'',
    // modalOpen: false
}
  // onChange = e => {
  //   this.setState({[e.target.name]:e.target.value})}
    onChange = e => this.setState({[e.target.name]:e.target.value})
    onSubmit = e => {
      e.preventDefault()
      // console.log("submitted")
      const {pick_up_address,drop_off_address } = this.state
      // console.log(pick_up_address,drop_off_address)
      this.props.searchTrips(pick_up_address,drop_off_address)
      // this.props.history.push('/')
      this.props.history.push('/')
  }
  render(){
    return(
      <section>
        <Modal open={this.props.modalOpen} onClose={this.props.handleModalOpen}>
                <div className="container">
                         <form onSubmit={this.onSubmit} className="form-inline">
                         <div>
                         <input type="text" value={this.state.pick_up_address} onChange={this.onChange} name="pick_up_address" className="form-control"  />
                         </div>
                         <div>
                         <input type="text" value={this.state.drop_off_address} onChange={this.onChange} name="drop_off_address"  className="form-control" />
                         </div>
                         <button onClick={this.props.handleModalOpen}>Submit</button>
                         </form>
                         </div>
           </Modal>
      </section>
    )
  }
}
// export default LoginModal;
const mapStateToProps = state => ({
  trips:state.trips.trips
})
export default connect(mapStateToProps,{getTrips,searchTrips}) (LoginModal)