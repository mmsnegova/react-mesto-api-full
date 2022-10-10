import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Login(props) {
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
    props.onLogin(password, email).finally(resetForm);
  }

  return (
    <>
      <Header>
        <Link to="sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <div className="content">
        <section className="authorization">
          <form className="popup__body" onSubmit={handleSubmit}>
            <h2 className="popup__title popup__title_dark">Вход</h2>
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
              aria-label="Войти"
            >
              Войти
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
