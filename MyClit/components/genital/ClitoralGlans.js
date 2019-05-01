import React, { Component } from "react";
import ReactDOM from 'react-dom';
import orgasmWorker from "./orgasmWorker.js";
import webWorker from "./webWorker";

class ClitoralGlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	activationCount : 0,
    	numberOfNerveEndings : 0,
    	thresholdForOrgasm : 4000
    };

    this.countActivatedNerves = this.countActivatedNerves.bind(this);
    this.checkAndFeelOrgasm = this.checkAndFeelOrgasm.bind(this);
    this.fetchOrgasmWorker = this.fetchOrgasmWorker.bind(this);
  }

  componentDidMount() {
    this.orgasmWorker = new webWorker(orgasmWorker);
  }

  countActivatedNerves(ActiveOrNot) {
  	var incrementVal;
  	if (ActiveOrNot){
  		incrementVal = 1;
  	}else{
  		incrementVal = -1;
  	}
    this.setState({(prevState) => {
	    return {
	      activationCount : prevState.activationCount + incrementVal
	    };
		}}, () => this.checkAndFeelOrgasm())
  }

  checkAndFeelOrgasm = () => {
  	let threshold = this.state.thresholdForOrgasm;
  	if (this.state.activationCount > threshold){
  		var orgasmIntensity = (this.state.activationCount - threshold) / (numberOfNerveEndings - threshold);
  		this.fetchOrgasmWorker("ClitoralGlans",orgasmIntensity);
    }
  }

  fetchOrgasmWorker(part, intensity) {
    this.orgasmWorker.postMessage([
    	this.props.sex_id, 
    	this.props.partner_id, 
    	part, 
    	this.props.body_position, 
    	this.props.role, 
    	intensity, 
    	this.props.sounds
    ]);
  }

  getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

  createNerveEndings = () => {
    let nerveEndings = [];
    var numberOfNerveEndings = this.getRandomInt(9000,10000);
    this.setState({numberOfNerveEndings: numberOfNerveEndings});
    for (let i = 0; i < numberOfNerveEndings; i++) {
      nerveEndings.push(
      	<div 
      	id = {i}
     		className = "nerveEndingOfClitoralGlans"
      	onTouchStart={this.countActivatedNerves(true)} 
      	onTouchEnd={this.countActivatedNerves(false)} 
      	></div>
      	)
    }
    return nerveEndings
  }

  render() {
    return (
      <div className="clitoralGlansContainer">
      	{this.createNerveEndings()}
      </div>
    );
  }
}

export default ClitoralGlans;