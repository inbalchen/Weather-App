import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import searchReducer from '../contsiners/app/SearchReducer'

const logger = createLogger()

const middlewares = [thunk, logger];

const store = createStore(
    combineReducers({
        search: searchReducer
    }),
    {},
    applyMiddleware(...middlewares)
)

export default store;
