import React, { useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { localizer, getMessagesES } from '../../helpers'
import { CalendarEvent, Navbar, CalendarModal, FabAddNew, FabDelete } from '..'
import { useUiStore, useCalendarStore } from '../../hooks'

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore()
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
    setActiveEvent(event)
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
      <FabDelete />
      <FabAddNew />
    </>
  )
}
