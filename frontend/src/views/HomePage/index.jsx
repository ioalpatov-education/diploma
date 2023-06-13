import Preloader from "../../components/Preloader";
import { useSelector, useDispatch } from "react-redux";
import ShoeCatalog from "../CatalogPage/ShoeCatalog";
const HomePage = () => {
  const { categories, shoeCatalog } = useSelector((state) => state.shoes);
  const shoeCatalogLoading = shoeCatalog.loading;
  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <Preloader />
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {shoeCatalogLoading ? <Preloader /> : <ShoeCatalog />}
      </section>
    </>
  );
};

export default HomePage;
