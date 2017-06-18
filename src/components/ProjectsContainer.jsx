import React from "react";
import PropTypes from "prop-types";
import Project from "./projects/Project.jsx";

export default class ProjectsContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="content-wrap">
          <div className="container">
            <h1>Recent Projects</h1>
            <hr /> {this.props.projects.map((project, index) => {
              const colors = project.fields.colors.map(function(a) {
                return a.color;
              });
              return (
                <div key={index}>
                  <Project
                    link={project.fields.link}
                    key={index}
                    index={index}
                    title={project.title.rendered}
                    description={project.excerpt.rendered}
                    tags={project.fields.tags}
                    colors={colors}
                    project={project}
                  />
                  <hr />
                </div>
              );
            }, this)}
          </div>
        </div>
      </div>
    );
  }
}

ProjectsContainer.propTypes = {
  projects: PropTypes.array.isRequired
};
