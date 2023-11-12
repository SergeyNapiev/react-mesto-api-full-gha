import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import InfoTooltip from "./InfoTooltip.js";
import Login from "./Login.js";
import Register from "./Register.js";
import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = React.useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = React.useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = React.useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = React.useState(false);
  const [isConfirmationLoading, setIsConfirmationLoading] = React.useState(false);

  function handleCardLike(card) {
    const token = localStorage.getItem('token');
    const isLiked = card.likes.some((user) => user === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((err) => console.log(`Ошибка обновления лайка: ${err}`));
  }

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo(localStorage.token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getCardList(localStorage.token)
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((error) => {
          console.log("Ошибка при получении данных карточек:", error);
        });
    }
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setIsConfirmationPopupOpen(true);
  };

  const handleCloseAllPopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  };

  function handleUpdateUser({ name, about }) {
    setIsEditProfileLoading(true);
    const token = localStorage.getItem('token');
    api
      .setUserInfo({ name, about }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseAllPopup();
      })
      .catch((error) => {
        console.log("Ошибка при обновлении данных пользователя:", error);
      })
      .finally(() => {
        // выключаем индикатор
        setIsEditProfileLoading(false);
      });
  }

  const handleUpdateAvatar = ({ avatar }) => {
    setIsEditAvatarLoading(true);
    const token = localStorage.getItem('token');
  api
    .setUserAvatar({ avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);

        handleCloseAllPopup();
      })
      .catch((error) => {
        console.log("Ошибка при обновлении аватара:", error);
      })
      .finally(() => {
        // выключаем индикатор
        setIsEditAvatarLoading(false);
      });
  };

  function handleCardDelete(card) {
    setIsConfirmationLoading(true);
    const token = localStorage.getItem('token');
    api
      .removeCardFromServer(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));

        handleCloseAllPopup();
      })
      .catch((error) => {
        console.log("Ошибка удаления карточки:", error);
      })
      .finally(() => {
        // выключаем индикатор
        setIsConfirmationLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlaceLoading(true);
    const token = localStorage.getItem('token');
    api
      .addNewCard({ name, link }, token)
      .then((newCard) => {
        setCards([...cards, newCard]);
        handleCloseAllPopup();
      })
      .catch((error) => {
        console.log("Ошибка при добавлении карточки:", error);
      })
      .finally(() => {
        setIsAddPlaceLoading(false);
      });
  }

  // выход
  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  //токенчек

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.error("Ошибка проверки токена:", error);
        });
    }
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  //регистрация
  function signUp({ password, email }) {
    Auth.register(password, email)
      .then((res) => {
        setIsSuccessInfoTooltipStatus(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        console.error(`Ошибка при регистрации ${error}`);
        setIsSuccessInfoTooltipStatus(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  //авторизация
  function signIn(password, email) {
    Auth.authorize(password, email)
      .then((res) => {
        setLoggedIn(true);
        navigate("/", { replace: true });
        setEmail(email);
      })
      .catch((error) => {
        console.error(`Ошибка при авторизации ${error}`);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessInfoTooltipStatus(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="body">
          <div className="page">
            <Header email={email} signOut={signOut} />
            <Routes>
              <Route path="/sign-in" element={<Login signIn={signIn} />} />
              <Route path="/sign-up" element={<Register signUp={signUp} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route
                path="/"
                element={
                  <ProtectedRouteElement
                    element={(props) => (
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardDeleteButtonClick={handleDeleteClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                        {...props}
                      />
                    )}
                    loggedIn={loggedIn}
                  />
                }
              />
            </Routes>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={handleCloseAllPopup}
              onUpdateUser={handleUpdateUser}
              isEditProfileLoading={isEditProfileLoading}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={handleCloseAllPopup}
              onSubmit={handleAddPlaceSubmit}
              isAddPlaceLoading={isAddPlaceLoading}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={handleCloseAllPopup}
              onUpdateAvatar={handleUpdateAvatar}
              isEditAvatarLoading={isEditAvatarLoading}
            />

            <ConfirmationPopup
              card={cardToDelete}
              isOpen={isConfirmationPopupOpen}
              onClose={handleCloseAllPopup}
              onDeleteCard={handleCardDelete}
              isConfirmationLoading={isConfirmationLoading}
            />

            <ImagePopup card={selectedCard} onClose={handleCloseAllPopup} />

            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              onClose={handleCloseAllPopup}
              isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;