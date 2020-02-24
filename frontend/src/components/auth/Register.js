import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import { register } from '../../actions/auth'
import { connect } from 'react-redux'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            password2:'',
            tel_no:''
        }
      }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault()
        const {username,email,password,password2,tel_no} = this.state
        if (password !== password2  ){
            alert("Passwords Do not match")
        }
        else{
            const newUser = {
                username,password,email,tel_no
            }
        this.props.register(newUser)
        }
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {username,email,password,password2,tel_no} = this.state
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={this.onChange} name="username"  />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} onChange={this.onChange} name="email"  />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={this.onChange} name="password"  />
                    </div>
                    <div>
                        <label>Password2</label>
                        <input type="password" value={password2} onChange={this.onChange} name="password2"  />
                    </div>
                    <div>
                        <label>Tel no</label>
                        <input type="tel" value={tel_no} onChange={this.onChange} name="tel_no"  />
                    </div>
                    <button>Sign Up </button>
                    <Link to="/login">Login</Link>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{register})(Register)