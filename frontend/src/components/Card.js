import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDeleteButtonClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__heart ${
    isLiked && "elements__heart_active"
  }`;

  const handleDeleteClick = () => {
    onCardDeleteButtonClick(card);
  };

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card)
  };

  return (
    <div className="elements__element" key={card._id}>
      {isOwn && (
        <button
          className="elements__delete"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="elements__item"
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <div className="elements__info">
        <h2 className="elements__title" id="#element-title">
          {card.name}
        </h2>
        <div className="elements__container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="like"
          ></button>
          <div className="elements__counter">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
