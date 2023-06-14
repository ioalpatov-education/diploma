import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendRequestToGetTopSales } from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";
import ShoesList from "../../components/ShoesList";

const TopSales = () => {
  const { items, loading } = useSelector((state) => state.shoes.topSales);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendRequestToGetTopSales());
  }, []);

  return (
    <>
      {!items.length && !loading ? null : (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {loading ? <Preloader /> : <ShoesList shoes={items} />}
        </section>
      )}
    </>
  );
};

export default TopSales;
