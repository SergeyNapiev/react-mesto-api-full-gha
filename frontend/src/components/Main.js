import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDeleteButtonClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <button
            type="button"
            className="profile__set-avatar"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__naming">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__about">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="edit"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="ФОТОЧКИ">
        {cards.slice().reverse().map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteButtonClick={onCardDeleteButtonClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
