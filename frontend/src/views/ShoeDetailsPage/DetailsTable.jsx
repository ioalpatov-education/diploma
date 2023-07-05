import { characteristics } from "../../utils/defaultData";
import { useContext } from "react";
import { ShoeContext } from "../ShoeDetailsPage";

const DetailsTable = () => {
  const { details } = useContext(ShoeContext);

  return (
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
  );
};

export default DetailsTable;
