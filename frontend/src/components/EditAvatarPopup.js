import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonContent="Сохранить"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="input-container">
        <input
          ref={inputRef}
          className="popup__input popup__input_avatar"
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar"
          id="avatar"
          required
        />
        <span className="popup__input-error avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
