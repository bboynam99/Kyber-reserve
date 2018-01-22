import { REHYDRATE } from 'redux-persist/lib/constants'
import ApiService from "../services/Connection/api.service"

const initState = function(){
  let apiService = new ApiService();
  return {
    apiService: apiService,
  }
}()

const global = (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (action.key === "global") {
        return initState
      } else {
        return state
      }
    }
    case "GLOBAL.SET_SECRET_KEY": {
      let newState = { ...state }
      newState.apiService.setSecretKey(action.payload)
      return newState
    }

    default: return state
  }
  
}

export default global