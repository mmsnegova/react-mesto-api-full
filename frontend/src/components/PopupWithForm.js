import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__body"
          name={props.name}
          method="POST"
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__save"
            type="submit"
            aria-label={props.buttonContent}
          >
            {props.buttonContent}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
