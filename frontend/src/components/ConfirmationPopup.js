import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmationPopup({
  card,
  isOpen,
  onClose,
  onDeleteCard,
  isConfirmationLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      value={isConfirmationLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPopup;
