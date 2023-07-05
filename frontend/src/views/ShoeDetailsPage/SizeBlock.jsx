import { useContext } from "react";
import { ShoeContext } from "../ShoeDetailsPage";

const SizeBlock = () => {
  const { details, selectedSize, setSelectedSize } = useContext(ShoeContext);

  const changeSize = (e, size) => {
    setSelectedSize(size);
  };
  return (
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
  );
};

export default SizeBlock;
