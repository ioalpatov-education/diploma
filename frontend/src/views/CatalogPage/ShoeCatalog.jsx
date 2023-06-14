import Filters from "./Filters";
import ShoesList from "../../components/ShoesList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendRequestToGetCategories,
  sendRequestToGetShoes,
} from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";
import { LoadingButton } from "@mui/lab";

const ShoeCatalog = ({ children }) => {
  const { categories, shoeCatalog } = useSelector((state) => state.shoes);
  const { loading: categoriesLoading } = categories;
  const { loading: shoeCatalogLoading, items: shoes, isGetMore } = shoeCatalog;

  const dispatch = useDispatch();

  useEffect(() => {
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
          <ShoesList shoes={shoes} />
        </>
      )}
      {isGetMore ? (
        <div className="text-center">
          {shoeCatalogLoading ? (
            <button className="btn btn-outline-primary" disabled>
              Загрузить ещё
            </button>
          ) : (
            <button className="btn btn-outline-primary" onClick={loadMoreShoes}>
              Загрузить ещё
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default ShoeCatalog;
