import React from "react";

function Login({ signIn }) {
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
    signIn(formData.password, formData.email);
  };

  return (
    <main className="content">
      <section className="login__container">
        <h2 className="login__heading">Вход</h2>
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
            value={formData.email || ""} // Добавлено значение value
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
            value={formData.password || ""} // Добавлено значение value
          />
          <span className="login__error" id="about-error"></span>
          <button type="submit" className="login__button" aria-label="save">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
