import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConformation(props) {
  function handleDeleteCardSubmit(evt) {
    evt.preventDefault();
    props.onConformationCardDelete(props.card);
    props.onClose();
  }
  return (
    <PopupWithForm
      name="with-conformation"
      title="Вы уверены?"
      buttonContent="Да"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleDeleteCardSubmit}
    />
  );
}

export default PopupWithConformation;
