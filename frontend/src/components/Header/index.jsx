import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/img/header-logo.png";
import CartButton from "./CartButton";
import HeaderLinks from "./HeaderLinks";
import SearchForm from "./SearchForm";

const Header = () => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={logoSrc} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <HeaderLinks />

              <div>
                <div className="header-controls-pics">
                  <SearchForm />
                  <CartButton />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
