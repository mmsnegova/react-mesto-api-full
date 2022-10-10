import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register(props) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setUserInfo({
      email: "",
      password: "",
    });
  };

  function handleChange(evt) {
    setUserInfo({
      ...userInfo,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { password, email } = userInfo;
    props.onRegister(password, email).finally(resetForm);
  }

  return (
    <>
      <Header>
        <Link to="sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <div className="content">
        <section className="authorization">
          <form className="popup__body" onSubmit={handleSubmit}>
            <h2 className="popup__title popup__title_dark">Регистрация</h2>
            <div className="input-container">
              <input
                className="popup__input popup__input_dark popup__input_email"
                required
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                type="text"
                placeholder="Email"
              />
              <span className="popup__input-error email-error"></span>
            </div>
            <div className="input-container">
              <input
                className="popup__input popup__input_dark popup__input_password"
                required
                id="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                type="password"
                placeholder="Пароль"
              />
              <span className="popup__input-error password-error"></span>
            </div>
            <button
              className="popup__save popup__save_dark"
              type="submit"
              aria-label="Зарегистрироваться"
            >
              Зарегистрироваться
            </button>
          </form>
          <div className="authorization__signin">
            <span>Уже зарегистрированы? </span>
            <Link to="sign-in" className="authorization__link">
              Войти
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
