import React from 'react'
import { Link } from 'react-router-dom'
 import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
class Header extends React.Component {
    render(){
        // 
        const { isAuthenticated,user} = this.props.auth
        const authLinks = (
            <ul>
                    <span>{ user ? `Welcome ${user.username }`: ""}</span>
                    <li><Link to="/">Home</Link></li>
                    <li>
                        <button onClick= {this.props.logout}>Logout</button>
                    </li>
                </ul>
        )
        const guestLinks = (
            <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
        )
        return(
            <header>
                { isAuthenticated ? authLinks : guestLinks}       
            </header>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default  connect(mapStateToProps,{logout})(Header)