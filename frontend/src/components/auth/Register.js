import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import { register } from '../../actions/auth'
import { connect } from 'react-redux'
import '../styles/main.scss'
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
        this.setState({
            username:'',
            email:'',
            password:'',
            password2:'',
            tel_no:''
        })
        }
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {username,email,password,password2,tel_no} = this.state
        return(
            <section id="register">
            <div className="container">
            <h1 className="title">Register as a Driver</h1>
                <h1>We already have tour wallet information, fill out the following fields to enable two factor authentication</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" minLength="8" required value={username} placeholder="xxxxxbbb" className="form-control" onChange={this.onChange} name="username"  />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" required value={email} placeholder="xxxxxbbb@gmail.com" className="form-control" onChange={this.onChange} name="email"  />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" minLength="8"  required placeholder="enter your password here" className="form-control" value={password} onChange={this.onChange} name="password"  />
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <input type="password" minLength="8" required className="form-control" placeholder="confirm your password" value={password2} onChange={this.onChange} name="password2"  />
                    </div>
                    <div>
                        <label>Tel no</label>
                        <input type="tel"  placeholder="+254700000000" required className="form-control" value={tel_no} onChange={this.onChange} name="tel_no"  />
                    </div>
                    <button className="primary-btn">Sign Up </button>
                    <p><Link to="/login">Login</Link> | <Link to="/register/rider">Register as a rider</Link></p>
                </form>
            </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{register})(Register)