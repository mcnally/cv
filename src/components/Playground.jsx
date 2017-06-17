import React from 'react';
import Codepen from './Codepen.jsx';
import axios from 'axios';

export default class Playground extends React.Component {
    constructor() {
        super();
        this.state = {
            pens: []
        }
    }

    componentDidMount() {
        let _this = this;
        let url = 'http://cpv2api.com/pens/popular/chrismcnally';
        this.serverRequest = axios
            .get(url)
            .then(function (result) {
                _this.setState({pens: result.data.data});
            })
    }

    render() {
        return (
            <div>
                <div className='content-wrap'>
                    <div className='container'>
                        <h2>Playground</h2>
                        {/*{this
                            .state
                            .pens
                            .map((pen, index) => {
                                return (<Codepen key={index} hash={pen.id} title={pen.title} details={pen.details}/>)
                            })}*/}
                    </div>
                </div>
            </div>
        )
    }
}