import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConformation from "./PopupWithConformation";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import ok from "../images/Ok.svg";
import error from "../images/Error.svg";
import * as auth from "../utils/auth";

export default function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "email@mail.ru",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConformationOpen, setIsPopupWithConformationOpen] =
    useState(false);
  const [isInfoTooltipnOpen, setInfoTooltipOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [infoRespose, setInfoRespose] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDelete, setCardDelete] = useState(null);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleNavMenuClick = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const handleDeleteCardClick = () => {
    setIsPopupWithConformationOpen(true);
  };

  const handleInfoTooltipResponse = () => {
    setInfoTooltipOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleCardDelete = (card) => {
    setCardDelete(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithConformationOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
    setCardDelete(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({
            email: res.data.email,
          });
        }
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) history.push("/");
  }, [loggedIn]);

  function handleRespons(img, message) {
    setInfoRespose({
      img,
      message,
    });
  }

  function onRegister(password, email) {
    return auth
      .register(password, email)
      .then(() => {
        handleRespons(ok, "Вы успешно зарегистрировались!");
        history.push("/sign-in");
      })
      .catch(() => {
        handleRespons(error, "Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        handleInfoTooltipResponse();
      });
  }

  function onLogin(password, email) {
    return auth
      .authorize(password, email)
      .then(() => {
        setLoggedIn(true);
        history.push("/");
      })
      .catch(() => {
        handleRespons(error, "Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltipResponse();
      });
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleConformationCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              {...userData}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onPopupWithConformation={handleDeleteCardClick}
              onNavMenu={handleNavMenuClick}
              setIsNavMenuOpen={setIsNavMenuOpen}
              isOpenNavMenu={isNavMenuOpen}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onSignOut={onSignOut}
              component={Main}
            />
            <Route path="/sign-up">
              <Register
                onInfoTooltip={handleInfoTooltipResponse}
                onRespons={handleRespons}
                onRegister={onRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onInfoTooltip={handleInfoTooltipResponse}
                onRespons={handleRespons}
                onLogin={onLogin}
              />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithConformation
          card={cardDelete}
          isOpen={isPopupWithConformationOpen}
          onClose={closeAllPopups}
          onConformationCardDelete={handleConformationCardDelete}
        />
        <ImagePopup {...selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          {...infoRespose}
          isOpen={isInfoTooltipnOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
