import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCartShoesFromLocalStorage } from "../../store/slices/shoesSlice";
const CartButton = () => {
  const { count } = useSelector((state) => state.shoes.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartShoesFromLocalStorage());
  }, []);

  return (
    <Link to={"/cart"}>
      <div className="header-controls-pic header-controls-cart">
        {!count ? null : (
          <div className="header-controls-cart-full">{count}</div>
        )}
        <div className="header-controls-cart-menu"></div>
      </div>
    </Link>
  );
};

export default CartButton;
