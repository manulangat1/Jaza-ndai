import React from 'react'
import { Link } from 'react-router-dom'
 import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import LoginModal from '../Trips/LoginModal'
class Header extends React.Component {
    state = {
        modalOpen: false
     }
   
     handleModalOpen = () => {
        this.setState((prevState) => {
           return{
              modalOpen: !prevState.modalOpen
           }
        })
     }
    render(){
        const { isAuthenticated,user} = this.props.auth
        const driverLinks = (
            <ul>
                {/* <li><Link to="/" onClick={this.handleModalOpen}>Home
                    </Link></li> */}
                    <li><Link to="/add">Add </Link></li>
                    <li><Link to="/transit">Transit </Link></li>
                    <li>
                    <div class="dropdown">
                    <button class="dropbtn"><i class="fas fa-user-tie"> { user ? `${user.username }`: ""}</i></button>
                    <div class="dropdown-content">
                        {/* <a href="#">Link 1</a>  
                          */}
                        <Link to="/profile">Profile </Link>
                        <a><button onClick= {this.props.logout} className="primary-btn"><i class="fas fa-sign-out-alt"> Log out</i></button></a>
                    </div>
                    </div>
                    </li>
            </ul>
        )
        const riderLinks = (
            <ul>
                <li><Link to="/" onClick={this.handleModalOpen}>Home</Link></li>
                <li><Link to="/transit">Transit </Link></li>
                <li>
                        {/* <button onClick= {this.props.logout}>Logout</button> */}
                        <div class="dropdown">
                    <button class="dropbtn"><i class="fas fa-user-tie"> { user ? `${user.username }`: ""}</i></button>
                    <div class="dropdown-content">
                        {/* <a href="#">Link 1</a>  
                          */}
                        <Link to="/profile">Profile </Link>
                        <a><button onClick= {this.props.logout} className="primary-btn"><i class="fas fa-sign-out-alt"> Log out</i></button></a>
                    </div>
                    </div>
                    </li>
        </ul>
        )
        const authLinks = (
            <ul>
                    { user && user.is_driver ? driverLinks : riderLinks}   
                </ul>
        )
        const guestLinks = (
            <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/admin">Register</Link></li>
                </ul>
        )
        return(
            <main>
            <header>
                <div className="container">
                <div classsName='grids'>
                    {/* <div> */}
                        {/* <h1>My Ride</h1> */}
                    {/* </div>
                    <div> */}
                    { isAuthenticated ? authLinks : guestLinks} 
                    {/* </div> */}
                  
                </div>
                </div>    
            </header>
            <LoginModal
           modalOpen={this.state.modalOpen}
           handleModalOpen={this.handleModalOpen}
        />
            </main>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default  connect(mapStateToProps,{logout})(Header)