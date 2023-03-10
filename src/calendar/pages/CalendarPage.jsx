import React, { useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import { localizer, getMessagesES } from '../../helpers'
import { CalendarEvent, Navbar, CalendarModal } from '..'
import { useUiStore } from '../../hooks'

const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Luis'
  }
}]

export const CalendarPage = () => {
  const { openDateModal } = useUiStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#34CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    console.log({ select: event })
  }

  const onViewChanged = (event) => {
    console.log({ event })
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        messages={getMessagesES()}
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  )
}
