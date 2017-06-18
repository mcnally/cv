import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="header-left">
                <h1 className="display-4">Chris McNally</h1>
                <h2>Design / Development / Consulting</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="float-md-right">
                <a href="https://chrismcnally.co.uk">chrismcnally.co.uk</a>
                &nbsp;/&nbsp;
                <a href="http://codepen.io/chrismcnally">codepen.io</a>
                &nbsp;/&nbsp;
                <a href="https://uk.linkedin.com/in/chrismcnally1">
                  linkedin.com
                </a>
                &nbsp;/&nbsp;
                <a href="https://twitter.com/ChrisMcNallyWeb">twitter.com</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
