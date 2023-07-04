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
      dispatch(resetShoesCatalogWithCategories());
      dispatch(sendRequestToGetShoes());
    }
  };
  return (
    <ShoeCatalog>
      <form className="catalog-search-form form-inline">
        <input
          onKeyDown={searchShoes}
          onChange={changeSearchValue}
          className="form-control"
          placeholder="Поиск"
          value={searchInput}
        />
      </form>
    </ShoeCatalog>
  );
};

export default CatalogPage;
