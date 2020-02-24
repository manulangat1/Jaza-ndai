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
            <section>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={this.onChange} name="username"  />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={this.onChange} name="password"  />
                    </div>
                    <button>Log in </button>
                    <Link to="/register">Register</Link>
                </form>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login)