import { GET_ALL_TRIPS } from './types'
import axios from 'axios'


export const getTrips = () => dispatch => (
    axios.get('/api/trip/')
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