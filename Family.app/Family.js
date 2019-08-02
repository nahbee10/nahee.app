import React from "react";

import Mom from './components/Mom';
import Dad from './components/Dad';
import Baby from './components/Baby';

import getAwesomeBioDad, getPregnancyTestResult, sortAndGetBest6Daddies from './api/basic';
import Human from './models/HumanModel';

const mother = process.env.NAHEE;

var daddyNumber = 0;
var selectedDaddiesArr = [];

class Family extends React.Component {
  constructor () {
    super();
    this.state = {
    	baby:undefined,
    	dad:undefined,
    	momState: {physical:undefined,mental:undefined},
    	dadState: {physical:undefined,mental:undefined},
    	babyState: {physical:undefined,mental:undefined},
    	familyState: undefined
    }
  }
  
  componentDidMount () {
  	setTimeout(function(){this.pregnancy(); this.setDaddy();}, 220898482000 /* 7 years in milliseconds */);
  	setTimeout(this.selectDaddies, 189341556000 /* 6 years in milliseconds */);
  }

  pregnancy () {
  	var pregnancySuccessBool = this.findSperm();
  	if (pregnancySuccessBool) {
  		setTimeout(this.birth(), 26297438333.3 /* 10 months in milliseconds */);
  	}else{
  		setTimeout(this.pregnancy(), 2629743833.3 /* 1 month in milliseconds */);
  	}
  }

  findSperm () {
  	getAwesomeBioDad().then(sperm => {
  		return this.getInsemination(sperm);
    })
  }

  getInsemination (s) {
  	var vaginaDiv = document.getElementById('vagina');
  	for (var i = 0; i < s.length; i++) {
	  	const spermDiv = document.createElement("div");
	    spermDiv.class = "sperm";
	    spermDiv.appendChild(s);
	    vaginaDiv.appendChild(spermDiv);
  	}

    setTimeout(
    	getPregnancyTestResult().then(result => {
  			return result;
    	}),
    	1209600000 /* 2 weeks in milliseconds */
    );

  }

  birth () {
  	this.setState({
  		baby: new Human()
  	});
  }

  selectDaddies () {
  	sortAndGetBest6Daddies().then(daddies => {
      selectedDaddiesArr = daddies;
    })
  }

  setDaddy () {
  	this.setState({
  		dad: selectedDaddiesArr[daddyNumber]
  	});

  	if (daddyNumber <= 6) {
  		daddyNumber ++;
  		setTimeout(this.setDaddy, this.state.dad.duration);
  	}
  }

  parenting () {}

  parentSelfCare () {}

  getParentCommunication () {}

  drawInteraction () {}

  setFamilyState () {}

  updateMomState (m) {}

  updateDadState (d) {}

  updateBabyState (b) {}

  render () {
    return (
    	<div className="home" style={{width:window.innerWidth, height:window.innerHeight}}>
    		<Mom i={mother} updateState = {this.updateMomState}></Mom>
    		<Dad i={this.state.dad} updateState = {this.updateDadState}></Dad>
    		<Baby i={this.state.baby} updateState = {this.updateBabyState}></Baby>
      	</div>
    );
  }
}

export default Family;