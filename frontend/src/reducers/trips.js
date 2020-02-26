import { GET_ALL_TRIPS,ADD_TRIP,TRIP_DETAILS,UPDATE_TRIP } from '../actions/types'

const initialState = {
    trips:[],
    trip:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case GET_ALL_TRIPS:
            return{
                ...state,
                trips:action.payload
            }
        case ADD_TRIP:
            return{
                ...state,
                trips:[...trips,action.payload]
            }
        case TRIP_DETAILS:
            return {
                ...state,
                trip:action.payload
            }
        default:
            return state
    }
}