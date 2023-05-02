import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Luis'
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
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
        if (event._id === payload._id) {
          return payload
        }

        return event
      })
    },
    onDeleteEvent: (state, { payload }) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id)
        state.activeEvent = null
      }
    }
  }
})

export const {
  onSetActiveEvent,
  onNewEvent,
  onUpdateEvent,
  onDeleteEvent
} = calendarSlice.actions
