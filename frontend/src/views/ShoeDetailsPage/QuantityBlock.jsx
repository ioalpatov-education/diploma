import { useContext } from "react";
import { ShoeContext } from "../ShoeDetailsPage";

const QuantityBlock = () => {
  const { quantity, setQuantity } = useContext(ShoeContext);

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
  );
};

export default QuantityBlock;
