import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sendRequestToGetShoeDetails } from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";

const characteristics = {
  sku: "Артикул",
  manufacturer: "Производитель",
  color: "Цвет",
  material: "Материалы",
  season: "Сезон",
  reason: "Повод",
};

const ShoeDetailsPage = () => {
  const { details, loading, error } = useSelector(
    (state) => state.shoes.shoeDetails
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendRequestToGetShoeDetails(id));
  }, []);

  useEffect(() => {
    if (error === "Not found") {
      navigate("/not-found");
    }
  }, [error]);

  const changeSize = (e, size) => {
    setSelectedSize(size);
  };

  const changeQuantity = (e, type) => {
    switch (type) {
      case "decrease":
        setQuantity(quantity - 1);

        break;
      case "increase":
        setQuantity(quantity + 1);
        break;
      default:
        break;
    }
  };

  const addShoeToCart = () => {
    const shoeData = {
      title: details.title,
      price: details.price,
      quantity,
    };

    const itemKey = `${id}-${selectedSize}`;

    const jsonShoesCartInLS = localStorage.getItem(
      process.env.REACT_APP_LS_SHOES_CART_KEY
    );

    const shoesCart = !jsonShoesCartInLS ? {} : JSON.parse(jsonShoesCartInLS);

    if (!shoesCart.hasOwnProperty(itemKey)) {
      shoesCart[itemKey] = shoeData;
    } else {
      shoesCart[itemKey] = {
        ...shoesCart[itemKey],
        quantity: shoesCart[itemKey].quantity + quantity,
      };
    }

    localStorage.setItem(
      process.env.REACT_APP_LS_SHOES_CART_KEY,
      JSON.stringify(shoesCart)
    );
    navigate("/cart");
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {!details ? (
            <h5 className="text-center">Нет деталей</h5>
          ) : (
            <section className="catalog-item">
              <h2 className="text-center">{details.title}</h2>
              <div className="row">
                <div className="col-5">
                  <img
                    src={details.images[0]}
                    className="img-fluid"
                    alt={details.title}
                  />
                </div>
                <div className="col-7">
                  <table className="table table-bordered">
                    <tbody>
                      {Object.entries(characteristics).map((characteristic) => {
                        const [value, translation] = characteristic;
                        return !details[value] ? null : (
                          <tr key={value}>
                            <td>{translation}</td>
                            <td>{details[value]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {!!details.sizes &&
                  !!details.sizes.length &&
                  details.sizes.filter((s) => s.available).length ? (
                    <>
                      <div className="text-center">
                        <p>
                          Размеры в наличии:
                          {details.sizes.map((s) => (
                            <button
                              className={
                                selectedSize === s.size
                                  ? "catalog-item-size selected"
                                  : "catalog-item-size"
                              }
                              key={s.size}
                              onClick={(e) => changeSize(e, s.size)}
                            >
                              {s.size}
                            </button>
                          ))}
                        </p>
                        <p>
                          Количество:
                          <span className="btn-group btn-group-sm pl-2">
                            <button
                              className="btn btn-secondary"
                              onClick={(e) => changeQuantity(e, "decrease")}
                              disabled={quantity === 1}
                            >
                              -
                            </button>
                            <span className="btn btn-outline-primary">
                              {quantity}
                            </span>
                            <button
                              className="btn btn-secondary"
                              onClick={(e) => changeQuantity(e, "increase")}
                              disabled={quantity === 10}
                            >
                              +
                            </button>
                          </span>
                        </p>
                      </div>
                      <button
                        className="btn btn-danger btn-block btn-lg"
                        disabled={!selectedSize}
                        onClick={addShoeToCart}
                      >
                        В корзину
                      </button>
                    </>
                  ) : (
                    <p>Размеров нет</p>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ShoeDetailsPage;
