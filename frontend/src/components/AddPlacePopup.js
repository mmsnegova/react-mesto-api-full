import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonContent="Создать"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="input-container">
        <input
          value={name || ""}
          onChange={handleChangeName}
          className="popup__input popup__input_place-name"
          type="text"
          placeholder="Название"
          name="name"
          id="place-name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error place-name-error"></span>
      </div>
      <div className="input-container">
        <input
          value={link}
          onChange={handleChangeLink}
          className="popup__input popup__input_link"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          id="link"
          required
        />
        <span className="popup__input-error link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
