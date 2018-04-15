import React from "react";
import PropTypes from "prop-types";

const SelectAuthority = ({ authorities, onChange, value }) => (
  <div className="select-autority">
    <label htmlFor="authority">
      Select a local authority:
      <select name="authority" value={value} onChange={onChange}>
        <option value="default" />
        {authorities &&
          authorities.map(authority => (
            <option key={authority.id} value={authority.id}>
              {authority.name}
            </option>
          ))}
      </select>
    </label>
  </div>
);

SelectAuthority.propTypes = {
  authorities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SelectAuthority;
