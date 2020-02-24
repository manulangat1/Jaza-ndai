import React from 'react'
import { connect } from 'react-redux'
import { Route,Redirect } from 'react-router-dom'
const PrivateRoute = ({component:Component,auth,...rest}) => 
(
    <Route 
      {...rest}
      render={props => {
          if (auth.isLoading){
              return(
                <div className="loader center">
                 <i className="fa fa-cog fa-spin" />
              </div>
              )
          } else if(!auth.isAuthenticated){
              return <Redirect to="/login" />
          }
          else{
            return <Component {...props} />
          }
          
      }}
    />
)
const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps) (PrivateRoute)