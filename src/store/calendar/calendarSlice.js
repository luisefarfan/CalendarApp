import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onNewEvent: (state, { payload }) => {
      state.events.push(payload)

      // Limpiar evento activo porque se va a cerrar el modal
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event.id === payload.id) {
          return payload
        }

        return event
      })
    },
    onDeleteEvent: (state, { payload }) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event.id !== state.activeEvent.id)
        state.activeEvent = null
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id)

        if (!exists) {
          state.events.push(event)
        }
      })
    },
    onLogoutCalendar: (state) => {
      state.events = []
      state.activeEvent = null
      state.isLoadingEvents = true
    }
  }
})

export const {
  onSetActiveEvent,
  onNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar
} = calendarSlice.actions
