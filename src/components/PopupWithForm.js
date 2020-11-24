import React from 'react';

function PopupWithForm(props) {

  return (
    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className={`popup__form popup-${props.name}__form`} name={props.name} noValidate>
        <button className={`popup__close popup-${props.name}__close`} type="button" onClick={props.onClose}></button>
        <h2 className={`popup__title popup-${props.name}__title"`}>{props.title}</h2>
        {props.children}
        <button className={`popup__submit popup-${props.name}__submit`} type="submit">{props.submit}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;