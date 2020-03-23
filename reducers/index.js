import { combineReducers } from 'redux'
import user from './userReducer'
import resident from './residentReducer'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
  user,
  resident,
  visibilityFilter
})

export default rootReducer
