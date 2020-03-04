import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { Link,Redirect } from 'react-router-dom'
class Login extends React.Component{
        state = {
            username:"",
            password:""
        }
        onChange = e => {
            this.setState({[e.target.name]:e.target.value})
        }
        onSubmit = e => {
            e.preventDefault()
            const {username,password} = this.state
            this.props.login(username,password)
        }
    render(){
        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {username,password} = this.state
        return(
            <section id="wrapper">
                <div id="left">
                <div className="logo">
                    <i class="fas fa-taxi fa-7x"></i>
                    <p>Book a ride</p>
                </div>
                <div id="signin">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={this.onChange} name="username" className="form-control"  />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={this.onChange} name="password" className="form-control"  />
                    </div>
                    <button className="primary-btn">Log in </button>
                </form>
                </div>
                </div>
                <div id="right">
                    <div id="showcase">
                    <div className="showcase">
                        <h1 className="showcase-text">
                            Go as you earn ....
                        </h1>
                        <Link to="/register" className="secondary-btn">Register</Link>
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login)