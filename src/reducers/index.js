import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
//import session from 'redux-persist/lib/storage/session'
import localForage from 'localforage'

import global from "./global.reducer"


const appReducer = combineReducers({
  global: persistReducer({
    key: 'global',
    storage: localForage
  }, global)
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer