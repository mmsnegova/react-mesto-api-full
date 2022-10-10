import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonContent="Сохранить"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="input-container">
        <input
          value={name || ""}
          onChange={handleChangeName}
          className="popup__input popup__input_name"
          type="text"
          placeholder="Введите имя"
          name="name"
          id="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error name-error"></span>
      </div>
      <div className="input-container">
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          className="popup__input popup__input_about"
          type="text"
          placeholder="Введите род деятельности"
          name="about"
          id="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error about-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
