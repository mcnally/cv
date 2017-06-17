import React from "react";
import propTypes from "prop-types";

class Quote extends React.Component {
  render() {
    return (
      <div className="content-wrap">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <blockquote className="blockquote">
                <p className="mb-0">{this.props.text}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Quote.propTypes = {
  text: propTypes.string.isRequired
};

export default Quote;
