import Filters from "./Filters";
import ShoesList from "../../components/ShoesList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendRequestToGetCategories } from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";

const ShoeCatalog = ({ children }) => {
  const { categories, shoeCatalog } = useSelector((state) => state.shoes);
  const { loading: categoriesLoading } = categories;
  const { loading: shoeCatalogLoading, items: shoes } = shoeCatalog;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendRequestToGetCategories());
  }, []);

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
          <div className="text-center">
            <button className="btn btn-outline-primary">Загрузить ещё</button>
          </div>
        </>
      )}
    </section>
  );
};

export default ShoeCatalog;
