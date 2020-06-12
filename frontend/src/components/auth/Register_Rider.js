import React from 'react'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import {registerRider} from '../../actions/auth'
class Register_Rider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            password2:'',
            tel_no:'',
            pic:null
        }
      }
      onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    handleImageChange = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
      };
    onSubmit = e => {
        e.preventDefault()
        const {username,email,password,password2,tel_no,pic} = this.state
        if (password !== password2  ){
            alert("Passwords Do not match")
        }
        else{
        const newUser = {
                username,password,email,tel_no,pic
            }
        console.log(newUser)
        this.props.registerRider(newUser)
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
        const {username,email,password,password2,tel_no,pic} = this.state
        return(
            <section id="register">
            <div className="container">
            <h1 className="title">Register as a Rider</h1>
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
                    <div>
                    <input type="file"
                   id="pic"
                    onChange={this.handleImageChange}  name="pic"/>
                    </div>
                    <button className="primary-btn">Sign Up as a Rider</button>
                    <p><Link to="/login">Login</Link> | <Link to="/register">Register as a Driver</Link></p>
                </form>
            </div>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{registerRider})(Register_Rider)