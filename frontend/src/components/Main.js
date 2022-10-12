import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  function onSignOut() {
    props.onSignOut();
    props.setIsNavMenuOpen(false);
  }
  return (
    <>
      <Header isOpenNavMenu={props.isOpenNavMenu ? "header_opened " : ""}>
        <div
          className={`header__menu-burger ${
            props.isOpenNavMenu ? "header__menu-burger_click" : ""
          }`}
          onClick={props.onNavMenu}
        >
          <span></span>
        </div>
        <nav
          className={`header__nav ${
            props.isOpenNavMenu ? "header__nav_opened" : ""
          }`}
        >
          <p className="header__user-login">{props.email}</p>
          <button onClick={onSignOut} className="header__exit-btn">
            Выйти
          </button>
        </nav>
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__bio">
            <div className="cover">
              <img
                className="profile__avatar"
                alt="Аватар"
                src={currentUser.avatar}
              />
              <button
                className="profile__update-avatar"
                type="button"
                aria-label="Редактировать аватар"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit"
                type="button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              />
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add"
            type="button"
            aria-label="Добавить"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="gallery">
          <ul className="gallery__list">
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  {...card}
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  onPopupWithConformation={props.onPopupWithConformation}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
