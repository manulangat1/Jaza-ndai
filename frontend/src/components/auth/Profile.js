import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Link,Redirect } from 'react-router-dom'
class Profile extends React.Component{

    render(){
        const {user } = this.props
        return(
            <section>
                <div className="container">
                    <h1>{user.username}</h1>
                    <p>{user.is_driver}</p>
                    <p>{user.tel_no}</p>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    user:state.auth.user
})
export default connect(mapStateToProps,{login})(Profile)