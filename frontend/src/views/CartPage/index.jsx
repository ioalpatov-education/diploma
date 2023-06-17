import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartShoesFromLocalStorage } from "../../store/slices/shoesSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, totalCost } = useSelector((state) => state.shoes.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartShoesFromLocalStorage());
  }, []);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {!items.length ? (
          <p>Нет товаров в корзине</p>
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
                    <button className="btn btn-outline-danger btn-sm">
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
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div
          className="card"
          // style="max-width: 30rem; margin: 0 auto;"
        >
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
              />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
              </label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">
              Оформить
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CartPage;
