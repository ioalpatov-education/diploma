import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ShoeCard = ({ shoe }) => {
  const { id, title, images, price } = shoe;
  return (
    <div className="card catalog-item-card">
      <img src={images[0]} className="card-img-top img-fluid" alt={title} />
      <div className="card-body">
        <p className="card-text card-title">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
};

export const ShoePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  // sku: PropTypes.string.isRequired,
  // manufacturer: PropTypes.string.isRequired,
  // color: PropTypes.string.isRequired,
  // material: PropTypes.string.isRequired,
  // reason: PropTypes.string.isRequired,
  // heelSize: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // oldPrice: PropTypes.number.isRequired,
  // sizes: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     size: PropTypes.string.isRequired,
  //     available: PropTypes.bool.isRequired,
  //   })
  // ).isRequired,
}).isRequired;

ShoeCard.propTypes = {
  shoe: ShoePropTypes,
};

export default ShoeCard;
