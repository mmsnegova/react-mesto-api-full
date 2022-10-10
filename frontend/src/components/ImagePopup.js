import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_view ${props.link && "popup_opened"}`}>
      <figure className="popup__figure">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <img className="popup__image" src={props.link} alt={props.name} />
        <figcaption className="popup__subtitle">{props.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
