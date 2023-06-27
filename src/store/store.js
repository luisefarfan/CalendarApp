import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice, authSlice } from '.'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // Para que no verifique que todas las propiedades enviadas al payload sean serializables
    serializableCheck: false
  })
})
