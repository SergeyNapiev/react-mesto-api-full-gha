import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isEditAvatarLoading,
}) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAvatar("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      value={isEditAvatarLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input"
        required
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
