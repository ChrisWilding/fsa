import PropTypes from "prop-types";
import React from "react";

const Breakdown = ({ breakdown }) => {
  const rating = [5, 4, 3, 2, 1];
  return (
    <div className="breakdown">
      <table>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {rating.map(label => (
            <tr key={label}>
              <td>{label}-star</td>
              <td>{breakdown[label]}%</td>
            </tr>
          ))}
          <tr>
            <td>Exempt</td>
            <td>{breakdown.Exempt}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Breakdown.propTypes = {
  breakdown: PropTypes.shape({
    5: PropTypes.number.isRequired,
    4: PropTypes.number.isRequired,
    3: PropTypes.number.isRequired,
    2: PropTypes.number.isRequired,
    1: PropTypes.number.isRequired,
    Exempt: PropTypes.number.isRequired
  }).isRequired
};

export default Breakdown;
