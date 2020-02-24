import {LOGOUT_SUCCESS,USER_LOADED,
    USER_LOADING,AUTH_ERROR,LOGIN_USER,
    REGISTER_DRIVER,REGISTER_RIDER, 
    LOGIN_SUCCESS } from './types'
import axios from 'axios'

export const registerD = (user) => dispatch => {
    axios
        .post('/api/register/',user)
        .then(res => {
            dispatch({
                type:REGISTER_DRIVER,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
    
}
export const loadUser = () => (dispatch,getState) => {
    dispatch({type:USER_LOADING})

    //GET token
    const token = getState().auth.token;

    //Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.get('/api/user/',config)
         .then(res => {
             dispatch({
                 type:USER_LOADED,
                 payload:res.data
             })
         })
         .catch(err => console.log(err))
}
export const login = (username,password) => dispatch => {

    //Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const  body = JSON.stringify({username,password})
    axios.post('/api/login/',body,config)
         .then(res => {
             dispatch({
                 type:LOGIN_SUCCESS,
                 payload:res.data
             })
         })
         .catch(err => console.log(err))
}
//LOGOUT
export const logout = () => (dispatch,getState) => {
    //GET token
    const token = getState().auth.token;

    //Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.post('/api/logout/',null,config)
         .then(res => {
             dispatch({
                 type:LOGOUT_SUCCESS
             })
         })
         .catch(err => console.log(err))
}