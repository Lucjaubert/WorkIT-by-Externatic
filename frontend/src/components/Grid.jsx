import React from "react";
import PropTypes from "prop-types";

const Grid = ({ column }) => {
  return (
    <table className="table">
      <thread>
        <tr>
          {column.map((col) => (
            <th key={col.title}>{col.title}</th>
          ))}
        </tr>
      </thread>
      <tbody>
        <tr>
          <td className="">Caca</td>
          <td className="">pipi</td>
          <td className="">coucou</td>
          <td className="">proute</td>
          <td className="">proute</td>
        </tr>
      </tbody>
    </table>
  );
};

Grid.propTypes = {
  column: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Grid;
