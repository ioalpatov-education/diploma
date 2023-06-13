import { useSelector } from "react-redux";

const Filters = () => {
  const { items, selectedCategoryId } = useSelector(
    (state) => state.shoes.categories
  );

  // console.log(items, selectedCategoryId);
  return (
    <ul className="catalog-categories nav justify-content-center">
      {items.map((cat) => {
        const { id, title } = cat;
        const linkClasses =
          selectedCategoryId === id ? "nav-link active" : "nav-link";
        return (
          <li className="nav-item" key={id}>
            <a className={linkClasses} href="##">
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Filters;
