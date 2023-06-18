import Filters from "./Filters";
import ShoesList from "../../components/ShoesList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendRequestToGetCategories,
  sendRequestToGetShoes,
  resetShoesCatalogWithCategories,
} from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";

const ShoeCatalog = ({ children }) => {
  const { categories, shoeCatalog } = useSelector((state) => state.shoes);
  const { loading: categoriesLoading } = categories;
  const { loading: shoeCatalogLoading, items: shoes, isGetMore } = shoeCatalog;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetShoesCatalogWithCategories());
    dispatch(sendRequestToGetCategories());
    dispatch(sendRequestToGetShoes());
  }, []);

  const loadMoreShoes = () => {
    dispatch(sendRequestToGetShoes());
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {shoeCatalogLoading ? (
        <Preloader />
      ) : (
        <>
          {children}
          {categoriesLoading ? <Preloader /> : <Filters />}
          {!shoes.length ? (
            <h5 className="text-center">Нет товаров</h5>
          ) : (
            <ShoesList shoes={shoes} />
          )}
        </>
      )}
      {isGetMore ? (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={loadMoreShoes}
            disabled={shoeCatalogLoading}
          >
            Загрузить ещё
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default ShoeCatalog;
