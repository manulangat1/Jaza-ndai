import { GET_ALL_TRIPS,
    ADD_TRIP,TRIP_DETAILS,
    UPDATE_TRIP,JOIN_TRIP,
    GET_TRIPS_DRIVER,
    GET_TRIPS_RIDER,
    SEARCH_TRIPS,
    GET_DRIVER
  } from '../actions/types'

const initialState = {
    trips:[],
    trip:[],
    tripData:[],
    tripS:[],
    driver:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case GET_ALL_TRIPS:
        case SEARCH_TRIPS:
            return{
                ...state,
                trips:action.payload
            }
        case GET_TRIPS_DRIVER:
        case GET_TRIPS_RIDER:
                return{
                    ...state,
                    tripS:action.payload
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
        case GET_DRIVER:
            return {
                ...state,
                driver:action.payload
            }
        case JOIN_TRIP:
            return{
                ...state,
                tripData:action.payload
            }
        default:
            return state
    }
}