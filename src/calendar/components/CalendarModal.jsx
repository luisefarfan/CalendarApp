import { useMemo, useState, useEffect } from 'react'
import { addHours, differenceInSeconds } from 'date-fns'
import DatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
import Modal from 'react-modal'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore()
  const { isDateModalOpen, closeDateModal } = useUiStore()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid'
  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent) {
      // Spread del objeto para que no haya problemas con la referencia
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  const handleChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleDateChange = (date, changing) => {
    setFormValues({
      ...formValues,
      [changing]: date
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    if (formValues.title.length <= 0) {
      Swal.fire('Titulo inválido', 'Debe ingresar el título del evento', 'error')
      return
    }

    await startSavingEvent(formValues)
    setFormSubmitted(false)
    closeDateModal()
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      // Clase del fondo
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(date) => handleDateChange(date, 'start')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            // Label del selector de hora
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(date) => handleDateChange(date, 'end')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={handleChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
