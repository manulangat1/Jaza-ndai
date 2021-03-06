import { GET_ALL_TRIPS,ADD_TRIP,
        TRIP_DETAILS,UPDATE_TRIP,
        JOIN_TRIP,GET_TRIPS_DRIVER,
        GET_TRIPS_RIDER ,
        SEARCH_TRIPS,
        GET_DRIVER,
        COMPLETE_TRIP,
        GET_TRANSIT,
        PAY,
        PAY_TRIP,
        RATE_DRIVER
        } from './types'
import axios from 'axios'
import { tokenConfig } from './auth'

export const getTrips = () => (dispatch,getState) => (
    axios.get('/api/trip/',tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:GET_ALL_TRIPS,
                 payload:res.data
             })
         })
         .catch(
             err => console.log(err)
         )
)
export const AddTrips = ({pick_up_address,drop_off_address,status,capacity,date}) => (dispatch,getState) => {
    const body = JSON.stringify({pick_up_address,drop_off_address,status,capacity,date})
    console.log(body)
    axios
        .post('/api/trip/',body,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:ADD_TRIP,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
    }
export const tripDetails = id => (dispatch,getState) => {
    axios.get(`/api/trip/${id}/`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:TRIP_DETAILS,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}

export const getDriver = () => (dispatch,getState) => {
    axios
        .get('api/all_driver/',tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_TRIPS_DRIVER,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}
export const getRider = () => (dispatch,getState) => {
    axios
        .get('api/all_rider/',tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_TRIPS_RIDER,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}

export const searchTrips = (pick_up_address,drop_off_address) => (dispatch,getState) => {
    console.log(pick_up_address,drop_off_address)
    axios.get(`/api/trips/?pick_up_address=${pick_up_address}&drop_off_address=${drop_off_address}`,null,tokenConfig(getState))
         .then(res => {
             dispatch({
                 type:SEARCH_TRIPS,
                 payload:res.data
             })
         })
         .catch(err => console.log(err))
}
export const loadDriver = id => (dispatch,getState) => {
    console.log(id)
    axios
        .get(`api/driver/?id=${id}`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_DRIVER,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}
export const completeView = id => (dispatch,getState) => {
    axios.put(`/api/transit/complete/${id}/`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:COMPLETE_TRIP,
                payload:res.data
            })
        })
        .catch(err => console.log(error))
}
export const transitView = () => ( dispatch,getState) => {
    axios.get("/api/transit/",tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_TRANSIT,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}
export const rateDriver = (courtesy,ride)  => (dispatch,getState) =>{
    const body = JSON.stringify({courtesy,ride})
    console.log(body)
    axios
        .post('/api/review/',body,tokenConfig(getState))
            .then(res => {
                dispatch({
                    type:RATE_DRIVER,
                    payload:res.data
                })
            })
            .catch(err => console.log(err))
}