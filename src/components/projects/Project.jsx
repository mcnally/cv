import React from "react";
import PropTypes from "prop-types";
import Lightbox from "react-image-lightbox";
import ProjectImageContainer from "./ProjectImageContainer.jsx";
import ProjectColors from "./ProjectColors.jsx";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
      isOpen: false
    };
  }
  handleImageClick(imageIndex) {
    this.setState({ imgIndex: imageIndex, isOpen: true });
  }

  getTitle() {
    return this.props.link !== ""
      ? <a target="_blank" className="underline" href={this.props.link}>
          {this.props.title}
        </a>
      : this.props.title;
  }

  getTags() {
    return this.props.tags.map((name, index) => {
      let tagList = index === 0 ? name.tag : " / " + name.tag;
      return tagList;
    });
  }

  getGradient() {
    const per = 100 / this.props.colors.length;
    return (
      this.props.colors
        .map(function(elem) {
          return elem.color;
        })
        .join(" " + per + "%, ") +
      " " +
      per +
      "%"
    );
  }
  setImageIndex(index) {
    this.setState({ imgIndex: index });
  }

  _renderLightBox(imageCollection) {
    const imageBaseUrl = "https://chrismcnally.co.uk/";
    const imageIndex = this.state.imgIndex;
    const modalStyle = {
      overlay: {
        background: "linear-gradient(" + this.getGradient() + ")"
      }
    };
    const previousImage =
      (imageIndex + imageCollection.length - 1) % imageCollection.length;
    const nextImage = (imageIndex + 1) % imageCollection.length;

    return (
      <Lightbox
        enableZoom={false}
        reactModalStyle={modalStyle}
        mainSrc={imageBaseUrl + imageCollection[imageIndex].image.url}
        nextSrc={
          imageBaseUrl +
            imageCollection[(imageIndex + 1) % imageCollection.length].image.url
        }
        prevSrc={
          imageBaseUrl +
            imageCollection[
              (imageIndex + imageCollection.length - 1) % imageCollection.length
            ].image.url
        }
        onCloseRequest={() => this.setState({ isOpen: false })}
        onMovePrevRequest={() => {
          this.setImageIndex(previousImage);
        }}
        onMoveNextRequest={() => {
          this.setImageIndex(nextImage);
        }}
      />
    );
  }

  render() {
    const project = this.props.project;
    const isOpen = this.state.isOpen;
    const images = project.fields.gallery;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="project-text">
              <div>
                {this.getTags()}
              </div>
              <strong>{this.getTitle()}</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.description
                }}
              />
            </div>
          </div>
          <div className="col-md-2">
            <ProjectColors colors={this.props.colors} />
          </div>
          <div className="col-md-6">
            <ProjectImageContainer
              handleImageClick={this.handleImageClick.bind(this)}
              index={this.props.index}
              type={""}
              images={images}
            />
          </div>
        </div>
        {isOpen && this._renderLightBox(images)}
      </div>
    );
  }
}

Project.propTypes = {
  index: PropTypes.number,
  colors: PropTypes.array,
  description: PropTypes.string,
  project: PropTypes.object,
  link: PropTypes.string,
  tags: PropTypes.array.isRequired,
  title: PropTypes.string
};
