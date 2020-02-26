import { JOIN_TRIP } from './types'
import axios from 'axios'
import { tokenConfig } from './auth'
export const joinTrip = id => (dispatch,getState) => {
    const token = getState().auth.token
    //Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.patch(`/api/trips/${id}/`,null,config)
         .then(res => {
             dispatch({
                 type:JOIN_TRIP,
                 payload:res.data
             })
         })
         .catch(
             err => console.log(err)
         )
}