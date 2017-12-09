import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import app from './home'

export default combineReducers({
  router: routerReducer,
  auth,
  app
})
