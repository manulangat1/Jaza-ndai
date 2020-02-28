import React from 'react'
import { Link } from 'react-router-dom'
 import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
class Header extends React.Component {
    render(){
        // 
        const { isAuthenticated,user} = this.props.auth
        const driverLinks = (
            <ul>
                <li><Link to="/">Home</Link></li>
                    <li><Link to="/add">Add </Link></li>
                    <li><Link to="/maps">Map </Link></li>
                    <li><Link to="/history">History </Link></li>
                    <li>
                        <button onClick= {this.props.logout}>Logout</button>
                    </li>
            </ul>
        )
        const riderLinks = (
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/maps">Map </Link></li>
                <li><Link to="/history">History </Link></li>
                <li>
                        <button onClick= {this.props.logout}>Logout</button>
                    </li>
        </ul>
        )
        const authLinks = (
            <ul>
                    <span className="name">{ user ? `Welcome ${user.username }`: ""}</span>
                    {/* <span>{ user && user.is_driver ? `Welcome ${user.username }`: "hey"}</span> */}
                    { user && user.is_driver ? driverLinks : riderLinks}   
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
                <div className="container">
                { isAuthenticated ? authLinks : guestLinks}   
                </div>    
            </header>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default  connect(mapStateToProps,{logout})(Header)