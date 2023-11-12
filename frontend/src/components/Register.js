import React from "react";
import { Link } from "react-router-dom";

function Register({ signUp }) {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь обрабатываем вход в систему
    signUp(formData);
  };

  return (
    <main className="content">
      <section className="login__container">
        <h2 className="login__heading">Регистрация</h2>
        <form className="popup__form" noValidate onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="login__input"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChange}
            value={formData.email || ""}
          />
          <span className="login__error" id="name-error"></span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            className="login__input"
            minLength="2"
            maxLength="200"
            required
            onChange={handleChange}
            value={formData.password || ""}
          />
          <span className="login__error" id="about-error"></span>
          <button type="submit" className="login__button" aria-label="save">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="login__link">
          Уже зарегистрированы? Войти{" "}
        </Link>
      </section>
    </main>
  );
}

export default Register;
