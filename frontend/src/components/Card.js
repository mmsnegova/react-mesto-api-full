import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const cardDeleteButtonClassName = `gallery__delete-button ${
    isOwn ? "gallery__delete-button_visible" : "gallery__delete-button_hidden"
  }`;
  const isLiked = props.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `gallery__like ${
    isLiked ? "gallery__like_active" : "gallery__like_inactive"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function openPopupWithConformation() {
    props.onPopupWithConformation();
    props.onCardDelete(props.card);
  }

  return (
    <li className="gallery__item">
      <img
        className="gallery__image"
        src={props.link}
        onClick={handleClick}
        alt={props.name}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={openPopupWithConformation}
      />
      <div className="gallery__info">
        <h2 className="gallery__title">{props.name}</h2>
        <div className="gallery__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleCardLike}
          />
          <h3 className="gallery__number-like">{props.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
