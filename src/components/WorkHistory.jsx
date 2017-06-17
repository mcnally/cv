import React from "react";
import propTypes from "prop-types";

export default class WorkHistoryContainer extends React.Component {
  render() {
    return (
      <div className="content-wrap">
        <div className="container">
          <h1>Work History</h1>
          <hr /> {this.props.work.map((work, index) => {
            return (
              <WorkHistory
                key={index}
                title={work.title}
                location={work.location}
                date={work.date}
                description={work.text}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class WorkHistory extends React.Component {
  render() {
    const { title, location, date, description } = this.props;
    return (
      <div className="work-history">
        <strong>{title}</strong>
        &nbsp;/ &nbsp;
        {location}
        &nbsp;/ &nbsp;
        <strong>{date}</strong>
        <p>{description}</p>
        <hr />
      </div>
    );
  }
}

WorkHistory.propTypes = {
  title: propTypes.string.isRequired,
  location: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};
WorkHistoryContainer.propTypes = {
  work: propTypes.array.isRequired
};
