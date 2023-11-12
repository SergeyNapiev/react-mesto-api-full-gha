import React from "react";

function ImagePopup({ onClose, card }) {
  return (
    <div
      className={`popup popup_background-color_dark ${
        card ? "popup_opened" : ""
      }`}
      id="photo"
    >
      {card && (
        <div className="popup__container  popup__container_bg-color_transparent">
          <button
            type="button"
            id="close-photo"
            className="popup__close"
            aria-label="Close"
            onClick={onClose}
          ></button>
          <img src={card.link} alt={card.name} className="popup__item" />
          <h2 className="popup__title">{card.name}</h2>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
