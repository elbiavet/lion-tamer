import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth/authSlice"
import { petSlice } from './pet/petSlice'
import { calendarSlice } from "./calendar/calendarSlice"
import { modalSlice } from "./modal/modalSlice"
import { ownerSlice } from "./owners/ownerSlice"

export const store = configureStore({
   reducer:  {
      modal: modalSlice.reducer,
      auth: authSlice.reducer,
      calendar: calendarSlice.reducer,
      owner: ownerSlice.reducer,
      pet: petSlice.reducer,
   }, 
   middleware:(getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>