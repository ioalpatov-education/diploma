import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartShoesFromLocalStorage } from "../../store/slices/shoesSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, totalCost } = useSelector((state) => state.shoes.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartShoesFromLocalStorage());
  }, []);

  const deleteCartItem = (e, key) => {
    localStorage.removeItem(key);
    dispatch(getCartShoesFromLocalStorage());
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {!items.length ? (
        <p className="text-center">Нет товаров в корзине</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, itemIdx) => (
              <tr key={itemIdx}>
                <td>{itemIdx}</td>
                <td>
                  <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{item.price} руб.</td>
                <td>{item.price * item.quantity} руб.</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={(e) =>
                      deleteCartItem(e, `${item.id}-${item.size}`)
                    }
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>{totalCost} руб.</td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Cart;
