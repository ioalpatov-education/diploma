import { useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sendRequestToGetShoeDetails } from "../../store/slices/shoesSlice";
import Preloader from "../../components/Preloader";
import DetailsTable from "./DetailsTable";
import SizeBlock from "./SizeBlock";
import QuantityBlock from "./QuantityBlock";

export const ShoeContext = createContext(null);

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
    <ShoeContext.Provider
      value={{ details, selectedSize, setSelectedSize, quantity, setQuantity }}
    >
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
                  <DetailsTable />
                  {!!details.sizes &&
                  !!details.sizes.length &&
                  details.sizes.filter((s) => s.available).length ? (
                    <>
                      <div className="text-center">
                        <SizeBlock />
                        <QuantityBlock />
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
    </ShoeContext.Provider>
  );
};

export default ShoeDetailsPage;
