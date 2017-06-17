import React from "react";
import PropTypes from "prop-types";

export default class ProjectImageContainer extends React.Component {
  render() {
    return (
      <div className="project-images">
        {this.props.images.map((image, index) => {
          return (
            <ProjectImage
              handleImageClick={this.props.handleImageClick}
              key={index}
              imgSet={this.props.images}
              type={this.props.type}
              index={index}
              image={image.image}
            />
          );
        })}
      </div>
    );
  }
}

ProjectImageContainer.propTypes = {
  images: PropTypes.array.isRequired,
  type: PropTypes.string,
  handleImageClick: PropTypes.func
};

class ProjectImage extends React.Component {
  render() {
    const onClick = () => {
      this.props.handleImageClick(this.props.index);
    };
    return (
      <span>
        <div key={this.props.index} className="thumb" onClick={onClick}>
          <img
            className={this.props.type + " gallery-" + this.props.index}
            src={
              "https://chrismcnally.co.uk/" +
                this.props.image.sizes.medium_large
            }
          />
        </div>
      </span>
    );
  }
}

ProjectImage.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  type: PropTypes.string,
  handleImageClick: PropTypes.func
};
