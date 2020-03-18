import { combineReducers } from 'redux'
import user from './userReducer'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  user,
  visibilityFilter
})

export default rootReducer
