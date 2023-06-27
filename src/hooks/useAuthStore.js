import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking())
      const { data } = await calendarApi.post('/auth/login', { email, password })

      // Guardar el token
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.id }))
    } catch (error) {
      console.log(error)

      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(onChecking())
      const { data } = await calendarApi.post('/auth/register', { name, email, password })

      // Guardar el token
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.id }))
    } catch (error) {
      console.log(error)

      dispatch(onLogout(error.response.data?.message || 'Error en el registro'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')

    if (!token) return dispatch(onLogout())

    try {
      const { data } = await calendarApi.get('/auth/renew')

      // Guardar el token
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.id }))
    } catch (error) {
      console.log(error)

      localStorage.removeItem('token')
      localStorage.removeItem('token-init-date')
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('token-init-date')

    dispatch(onLogout())
  }

  return {
    // Propiedades
    status,
    user,
    errorMessage,

    // Metodos
    checkAuthToken,
    startLogin,
    startRegister,
    startLogout
  }
}
