import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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

//
// ДОБАВИТЬ ОБРАБОТКУ ОШИБОК
//

const ShoeDetailsPage = () => {
  const { details, loading } = useSelector((state) => state.shoes.shoeDetails);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendRequestToGetShoeDetails(id));
  }, []);

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

  return (
    <>
      {loading || !details ? (
        <Preloader />
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
              <div className="text-center">
                {!!details.sizes &&
                !!details.sizes.length &&
                details.sizes.filter((s) => s.available).length ? (
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
                ) : (
                  <p>Размеров нет</p>
                )}
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
                    <span className="btn btn-outline-primary">{quantity}</span>
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
              >
                В корзину
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ShoeDetailsPage;