import React from 'react';
import { useHistory } from 'react-router-dom';
import { authorize } from '../utils/auth';

function Login(props) {
  const history = useHistory();
  const email = React.useRef();
  const password = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    
    authorize(password.current.value, email.current.value)
      .then((res) => {
        if (res) {
          props.loggedStatus(email.current.value);
          history.push('/')
        }
      })
      .catch((err) => {
        props.onEnd(false);
        if (err === 400) {
          console.error(`${err} - не передано одно из полей`);
        }
        else {
          console.error(`${err} - пользователь с email не найден`);
        }
      })
  }

  return (
    <section className="sign sign-in">
      <form className="sign__form sign-in__form" name="sign-in" onSubmit={handleSubmit} noValidate>
        <h2 className="sign__title sign-in__title">Вход</h2>
        <input ref={email} className="sign__text sign-in__text"  id="email-input" type="email" name="email" placeholder="Email" minLength="2" maxLength="40" required />
        <input ref={password} className="sign__text sign-in__text" id="password-input" type="password" name="password" placeholder="Пароль" minLength="2" maxLength="200" required />
        <button className="sign__submit sign-in__submit" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;