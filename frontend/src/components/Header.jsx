import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/",
    title: "Главная",
  },
  {
    to: "/catalog",
    title: "Каталог",
  },
  {
    to: "/about",
    title: "О магазине",
  },
  {
    to: "/contacts",
    title: "Контакты",
  },
];

const Header = () => {
  const logoSrc = require("../assets/img/header-logo.png");
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={logoSrc} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {links.map((link, linkIdx) => (
                  <li className="nav-item " key={linkIdx}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={link.to}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
