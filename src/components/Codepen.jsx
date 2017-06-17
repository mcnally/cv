import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";

export default class Codepen extends React.Component {
  static get defaultProps() {
    return {
      user: "chrismcnally",
      height: "450px",
      width: "100%",
      tab: "result",
      theme: "light",
      version: "1",
      hash: "",
      preview: false
    };
  }

  render() {
    const user = `http://codepen.io/${this.props.user}`;
    // const pen = `${user}/pen/${this.props.hash}/`;
    return (
      <div className="row">
        <div className="col-md-8">
          <p
            data-height="100%"
            data-theme-id={this.props.theme}
            data-slug-hash={this.props.hash}
            data-default-tab={this.props.tab}
            data-user={this.props.user}
            data-embed-version={this.props.version}
            data-pen-title={this.props.title}
            className="codepen"
          />
        </div>
        <div className="col-md-4" />
        <hr />
        <Script
          onLoad={function() {}}
          onError={function() {}}
          url="https://production-assets.codepen.io/assets/embed/ei.js"
        />
      </div>
    );
  }
}

Codepen.PropTypes = {
  user: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  tab: PropTypes.string,
  theme: PropTypes.string,
  version: PropTypes.number,
  hash: PropTypes.string,
  preview: PropTypes.bool
};
