import Filters from "./Filters";
import ShoesList from "../../components/ShoesList";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendRequestToGetCategories } from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";

const ShoeCatalog = () => {
  const { categories } = useSelector((state) => state.shoes);
  const categoriesLoading = categories.loading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendRequestToGetCategories());
  }, []);

  return (
    <>
      {categoriesLoading ? <Preloader /> : <Filters />}

      {/* <ShoesList /> */}
      <div className="text-center">
        <button className="btn btn-outline-primary">Загрузить ещё</button>
      </div>
    </>
  );
};

export default ShoeCatalog;
