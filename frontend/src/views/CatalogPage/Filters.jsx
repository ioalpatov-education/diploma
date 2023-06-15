import { useSelector, useDispatch } from "react-redux";
import {
  changeSelectCategoryId,
  sendRequestToGetShoes,
} from "../../store/slices/shoesSlice";

const Filters = () => {
  const { items, selectedCategoryId } = useSelector(
    (state) => state.shoes.categories
  );

  const dispatch = useDispatch();

  const handleClick = (e, id) => {
    dispatch(changeSelectCategoryId(id));
    dispatch(sendRequestToGetShoes());
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      {items.map((cat) => {
        const { id, title } = cat;
        const linkClasses =
          selectedCategoryId === id || (!selectedCategoryId && title === "Все")
            ? "nav-link active"
            : "nav-link";
        return (
          <li className="nav-item" key={id}>
            <a
              className={linkClasses}
              href="##"
              onClick={(e) => handleClick(e, id)}
            >
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Filters;
