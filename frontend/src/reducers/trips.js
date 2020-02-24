import { GET_ALL_TRIPS } from '../actions/types'

const initialState = {
    trips:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case GET_ALL_TRIPS:
            return{
                ...state,
                trips:action.payload
            }
        default:
            return state
    }
}