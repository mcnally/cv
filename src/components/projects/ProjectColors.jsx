import React from "react";
import PropTypes from "prop-types";

export default function ProjectColors(props) {
  return (
    <div className="color-scheme">
      {props.colors.map((color, index) => {
        return <span key={index} style={{ backgroundColor: color }} />;
      })}
    </div>
  );
}

ProjectColors.propTypes = {
  colors: PropTypes.array.isRequired
};
