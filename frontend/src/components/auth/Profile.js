import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Link,Redirect } from 'react-router-dom'
import '../styles/main.scss'
class Profile extends React.Component{

    render(){
        const {user } = this.props
        return(
            <section id="profile">
                <div className="container">
                <img src={user.pic} alt="user image" />
                    <div>
                    <h1>{user.username}</h1>
                    <p>{user.is_driver}</p>
                    <p>{user.tel_no}</p>
                    <Link to="/history"  className="secondary-btn" >View all your rides</Link>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    user:state.auth.user
})
export default connect(mapStateToProps,{login})(Profile)