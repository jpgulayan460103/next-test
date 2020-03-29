import { combineReducers } from 'redux'
import user from './userReducer'
import resident from './residentReducer'
import barangayOfficial from './barangayOfficialReducer'

const rootReducer = combineReducers({
  user,
  resident,
  barangayOfficial,
})

export default rootReducer
