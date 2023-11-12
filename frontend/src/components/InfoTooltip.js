import React from "react";

function InfoTooltip({ isOpen, onClose, isSuccessInfoTooltipStatus }) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <div
          className={`popup__logo ${
            isSuccessInfoTooltipStatus
              ? "popup__logo_success"
              : "popup__logo_error"
          }`}
        ></div>
        <h2 className="popup__article">
          {isSuccessInfoTooltipStatus
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
