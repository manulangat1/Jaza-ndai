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
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} className="form-control" onChange={this.onChange} name="username"  />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={email} className="form-control" onChange={this.onChange} name="email"  />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={this.onChange} name="password"  />
                    </div>
                    <div>
                        <label>Password2</label>
                        <input type="password" className="form-control" value={password2} onChange={this.onChange} name="password2"  />
                    </div>
                    <div>
                        <label>Tel no</label>
                        <input type="tel" className="form-control" value={tel_no} onChange={this.onChange} name="tel_no"  />
                    </div>
                    <button className="primary-btn">Sign Up </button>
                    <Link to="/login">Login</Link>
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