import {LOGIN_SUCCESS,LOGIN_FAIL,USER_LOADED,
    USER_LOADING,AUTH_ERROR,LOGIN_USER,
    REGISTER_DRIVER,REGISTER_RIDER,
    LOGOUT_SUCCESS } from '../actions/types'

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading: false,
    user:null
}

export default function(state=initialState,action){
    switch(action.type){
        case REGISTER_DRIVER:
            return{
                ...state,
                user:action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false
            }
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated:null,
                isLoading: false,
                user:null,
                token:null
            }
        default:
            return state
    }
}