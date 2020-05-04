import {createStore,applyMiddleware,combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
const  middleware = [thunk]
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
const newReducer = rootReducer
store.replaceReducer(newReducer)
console.log(store)
export default store