import { NavLink, useNavigate, Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import {
  changeSearchInput,
  sendRequestToGetShoes,
  resetShoesCatalogWithCategories,
  getCartShoesCountFromLocalStorage,
} from "../store/slices/shoesSlice";
import { useSelector, useDispatch } from "react-redux";
import logoSrc from "../assets/img/header-logo.png";
import { links } from "../utils/defaultData";

const Header = () => {
  const { shoeCatalog, shoppingCart } = useSelector((state) => state.shoes);

  const searchInput = "shoeCatalog.search;";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchFormRef = useRef(null);

  useEffect(() => {
    dispatch(getCartShoesCountFromLocalStorage());
  }, []);

  useEffect(() => {
    console.log("shoppingCartShoesCount");
  });

  const handleSearchExpanderClick = () => {
    searchFormRef.current.classList.toggle("invisible");

    if (
      !searchInput ||
      !searchFormRef.current.classList.contains("invisible")
    ) {
      return;
    }

    dispatch(resetShoesCatalogWithCategories());
    dispatch(sendRequestToGetShoes());
    navigate("/catalog");
  };

  const changeSearchValue = (e) => {
    const value = e.target.value;
    dispatch(changeSearchInput(value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchExpanderClick();
    }
  };

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
                    onClick={handleSearchExpanderClick}
                  ></div>

                  <Link to={"/cart"}>
                    <div className="header-controls-pic header-controls-cart">
                      {!shoppingCart.count ? null : (
                        <div className="header-controls-cart-full">
                          {shoppingCart.count}
                        </div>
                      )}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                <form
                  ref={searchFormRef}
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input
                    onKeyDown={handleKeyDown}
                    className="form-control"
                    onChange={changeSearchValue}
                    value={searchInput}
                    placeholder="Поиск"
                  />
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
