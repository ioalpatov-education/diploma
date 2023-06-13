import ShoeCard, { ShoePropTypes } from "./ShoeCard";
import PropTypes from "prop-types";

const ShoesList = ({ shoes }) => {
  return (
    <div className="row">
      {shoes.map((shoe) => {
        return (
          <div className="col-4" key={shoe.id}>
            <ShoeCard shoe />
          </div>
        );
      })}
    </div>
  );
};

ShoesList.propTypes = {
  shoes: PropTypes.arrayOf(PropTypes.shape(ShoePropTypes)),
};

export default ShoesList;
