import { GET_ALL_TRIPS } from './types'
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