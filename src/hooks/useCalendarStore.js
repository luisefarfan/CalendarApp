import { useDispatch, useSelector } from "react-redux"
import { onDeleteEvent, onNewEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {
  const dispatch = useDispatch()

  const {
    events,
    activeEvent
  } = useSelector((state) => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    // TODO llegar al backend

    if (calendarEvent._id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }))
    }
    else {
      // Creando
      dispatch(onNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startDeletingEvent = async () => {
    // TODO llegar al backend

    dispatch(onDeleteEvent())
  }

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}
