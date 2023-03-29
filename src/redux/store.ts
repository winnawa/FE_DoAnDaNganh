import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import lampControlReducer from './lamp-control-page.slice'
export const store = configureStore({
  reducer: {
    lampControl: lampControlReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch