import { useDispatch, useSelector } from "react-redux"
import { onDeleteEvent, onLoadEvents, onNewEvent, onSetActiveEvent, onUpdateEvent } from "../store"
import calendarApi from "../api/calendarApi"
import { convertEventToDateEvents } from "../helpers/convertEventsToDateEvents"
import Swal from "sweetalert2"

export const useCalendarStore = () => {
  const dispatch = useDispatch()

  const {
    events,
    activeEvent
  } = useSelector((state) => state.calendar)

  const {
    user
  } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)

        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }

      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent)

      const { evento } = data

      dispatch(onNewEvent({ ...calendarEvent, id: evento.id, user }))
    } catch (error) {
      const errores = []
      for (const key in error.response.data.errors) {
        errores.push(error.response.data.errors[key].msg)
      }
      Swal.fire('Error al guardar', errores.reduce((acc, error) => {
        return acc += error + '\n'
      }, ''), 'error')

    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)

      dispatch(onDeleteEvent())
    } catch (error) {
      Swal.fire('Error al eliminar', 'error')
    }

    dispatch(onDeleteEvent())
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')

      const eventos = convertEventToDateEvents(data.eventos)

      dispatch(onLoadEvents(eventos))
    } catch (error) {

    }
  }

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
