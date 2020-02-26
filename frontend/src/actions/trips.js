import { GET_ALL_TRIPS,ADD_TRIP,TRIP_DETAILS,UPDATE_TRIP,JOIN_TRIP } from './types'
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
export const AddTrips = ({pick_up_address,drop_off_address,status,kms}) => (dispatch,getState) => {
    const body = JSON.stringify({pick_up_address,drop_off_address,status,kms})
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
