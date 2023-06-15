import ShoeCatalog from "./ShoeCatalog";
import {
  changeSearchInput,
  sendRequestToGetShoes,
  resetShoesCatalogWithCategories,
} from "../../store/slices/shoesSlice";
import { useSelector, useDispatch } from "react-redux";

const CatalogPage = () => {
  const searchInput = useSelector((state) => state.shoes.shoeCatalog.search);

  const dispatch = useDispatch();

  const changeSearchValue = (e) => {
    const value = e.target.value;
    dispatch(changeSearchInput(value));
  };

  const searchShoes = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(resetShoesCatalogWithCategories());
      dispatch(sendRequestToGetShoes());
    }
  };
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline">
        <input
          onKeyDown={searchShoes}
          onChange={changeSearchValue}
          className="form-control"
          placeholder="Поиск"
          value={searchInput}
        />
      </form>

      <ShoeCatalog />
    </section>
  );
};

export default CatalogPage;
