import React from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Quote from "./Quote.jsx";
import WorkHistoryContainer from "./WorkHistory.jsx";
import ProjectsContainer from "./ProjectsContainer.jsx";
import data from "../data/data";
// import Playground from './Playground.jsx';
import "../styles/main.scss";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pens: [],
      projects: []
    };
  }

  getData() {}

  componentDidMount() {
    const appUrl = "https://chrismcnally.co.uk";
    const projectEndpoint = `${appUrl}/wp-json/wp/v2/projects`;
    //const penEndpoint = `${appUrl}/wp-json/wp/v2/pens`;
    this.api(projectEndpoint).then(response => {
      this.setState({ projects: response });
    });

    // this.api(penEndpoint).then((response)=>{      this.setState({pens:response});

    // });
  }

  api(endPoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(endPoint)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Quote text={data.bio} />
        <WorkHistoryContainer work={data.work_history} />
        <ProjectsContainer projects={this.state.projects} />
        {" "}
        {/*<Playground />*/}
      </div>
    );
  }
}
