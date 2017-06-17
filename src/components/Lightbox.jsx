import React from 'react';
import {ProjectColors} from './Projects.jsx';

export default class Lightbox extends React.Component {
  render() {
    let cssClasses = ['lightbox'];
    let img = this.props.project.images[2];
    if (this.props.isOpen) {
      cssClasses.push('lightbox-open')
    }
    return (
      <div onClick={() => this.props.handleClick(0, false)} className={cssClasses.join(' ')}>
        <div className='lightbox-bg'>
          <ProjectColors colors={this.props.project.colors}/>
        </div>
        <div className='lightbox-inner'>
          <div>
            <div className='inner-top'></div>
            <div className='inner-content'>
              <div className='image-gallery'>
              <img className={'image-type-' + this.props.project.image_type} src={this.props.project.images[this.props.img]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}