import React, { useEffect } from 'react';
import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: ''
}

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore()
  const { loginEmail, loginPassword, handleChange: handleLoginChange } = useForm(loginFormFields)
  const { registerEmail, registerName, registerPassword, registerPassword2, handleChange: handleRegisterChange } = useForm(registerFormFields)

  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Error en la autenticación', errorMessage, 'error')
    }
  }, [errorMessage])


  const loginSubmit = (event) => {
    event.preventDefault()

    startLogin({ email: loginEmail, password: loginPassword })
  }

  const registerSubmit = (event) => {
    event.preventDefault()

    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en el registro', 'Las contraseñas deben coincidir', 'error')
      return
    }

    startRegister({ name: registerName, email: registerEmail, password: registerPassword })
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                value={registerPassword}
                onChange={handleRegisterChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassword2'
                value={registerPassword2}
                onChange={handleRegisterChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
