import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jobReducer from './job_slice'

const rootReducer = combineReducers({
    jobs: jobReducer
})

export type rootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

  export default store;