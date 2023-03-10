import React from 'react'

export const CalendarEvent = ({ event }) => {
  // Viene del calendario, cuando le sobreescribimos el componente del evento
  const { title, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
