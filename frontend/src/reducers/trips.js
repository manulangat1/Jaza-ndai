import { GET_ALL_TRIPS,
    ADD_TRIP,TRIP_DETAILS,
    UPDATE_TRIP,JOIN_TRIP,
    GET_TRIPS_DRIVER,
    GET_TRIPS_RIDER,
    SEARCH_TRIPS,
    GET_DRIVER,
    COMPLETE_TRIP,
    GET_TRANSIT,
    PAY,
    PAY_TRIP,
    RATE_DRIVER
  } from '../actions/types'

const initialState = {
    trips:[],
    trip:[],
    tripData:[],
    tripS:[],
    driver:[],
    complete:[],
    onT:[],
    pays:[],
    payT:[],
    rating:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case COMPLETE_TRIP:
            return{
                ...state,
                complete:action.payload
            }
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
        case GET_TRANSIT:
            return{
                ...state,
                onT:action.payload
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
        case RATE_DRIVER:
            return {
                ...state,
                rating:action.payload
            }
        case JOIN_TRIP:
            return{
                ...state,
                tripData:action.payload
            }
        case PAY:
            return{
                ...state,
                pays:action.payload
            }
        case PAY_TRIP:
            return{
                ...state,
                payT:action.payload
            }
        default:
            return state
    }
}