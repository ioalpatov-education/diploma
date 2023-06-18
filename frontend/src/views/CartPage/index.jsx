import Cart from "./Cart";
import Order from "./Order";
import { useSelector } from "react-redux";
import Preloader from "../../components/Preloader";

const CartPage = () => {
  const { loading } = useSelector((state) => state.shoes.shoppingCart);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Cart />
          <Order />
        </>
      )}
    </>
  );
};

export default CartPage;
