import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_info-tooltip ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__content popup__content_center">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img src={props.img} alt="Ответ" />
        <h3 className="popup__title popup__title_large">{props.message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
