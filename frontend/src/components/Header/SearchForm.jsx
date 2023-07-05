import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  changeSearchInput,
  sendRequestToGetShoes,
  resetShoesCatalogWithCategories,
} from "../../store/slices/shoesSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchForm = () => {
  const { search } = useSelector((state) => state.shoes.shoeCatalog);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchFormRef = useRef(null);

  const handleSearchExpanderClick = () => {
    searchFormRef.current.classList.toggle("invisible");

    if (!search || !searchFormRef.current.classList.contains("invisible")) {
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
    <>
      <form
        ref={searchFormRef}
        data-id="search-form"
        className="header-controls-search-form form-inline invisible"
      >
        <input
          onKeyDown={handleKeyDown}
          className="form-control"
          onChange={changeSearchValue}
          value={search}
          placeholder="Поиск"
        />
      </form>
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={handleSearchExpanderClick}
      ></div>
    </>
  );
};

export default SearchForm;
