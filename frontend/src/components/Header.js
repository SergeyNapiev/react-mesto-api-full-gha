import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ email, signOut }) {
  const location = useLocation();
  let headerListContent;
  let headerListGreyContent;
  let headerPath;

  if (location.pathname === "/sign-in") {
    headerListContent = "Регистрация";
  } else if (location.pathname === "/sign-up") {
    headerListContent = "Войти";
  } else if (location.pathname === "/") {
    headerListContent = email;
    headerListGreyContent = "Выйти";
  }

  if (headerListContent === "Регистрация") {
    headerPath = "/sign-up";
  } else if (headerListContent === "Войти") {
    headerPath = "/sign-in";
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <ul className="header__container">
        <li>
          <Link className="header__list" to={headerPath}>
            {headerListContent}
          </Link>
        </li>
        <li>
          <button
            onClick={signOut}
            className="header__list header__list_color-grey"
          >
            {headerListGreyContent}
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
