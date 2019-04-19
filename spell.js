// get desired boobs 
// simple one page website with two simplified shapes of boobs in the canvas but in the code its actually spell to get desired boobies
// laptop / boobmixer (or any mixer with at least 4 knobs and 6 joysticks) / your boobs

// This spell should be done in a node.js installed server(computer)

// part 1 - calling dependencies
// say

import React, Component from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import SunCalc from 'suncalc';

// part 2 - declaration
// (call a little fairy component to help you imagine new boobs more vividly)
// change the name 'Nahee' to yours 
// you need to say the following spell and
// raise your right index finger in the air as a coordinate and follow the path 

class BoobsController extends React.Component {
  constructor () {
    super();
  }
  drawBoobs(){
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("Nahee");

    ctx.fillStyle = ps.boobColor;
    ctx.beginPath();
    ctx.ellipse(ps.LCoords[0], ps.LCoords[1], ps.sizeL[0],  ps.sizeL[1], 0, 0, 2 * Math.PI);
    ctx.beginPath();
    ctx.ellipse(ps.RCoords[0], ps.RCoords[1], ps.sizeR[0],  ps.sizeR[1], 0, 0, 2 * Math.PI);

    ctx.fillStyle = ps.titColor;
    ctx.beginPath();
    ctx.ellipse(ps.LtitCoords[0], ps.LtitCoords[1], ps.LtitSz[0],  ps.LtitSz[1], 0, 0, 2 * Math.PI);
    ctx.beginPath();
    ctx.ellipse(ps.RtitCoords[0], ps.RtitCoords[1], ps.RtitSz[0],  ps.RtitSz[1], 0, 0, 2 * Math.PI);
  }
  componentDidMount(){
    this.drawBoobs();
  }
  render () {
    return (
      <div>
         <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} />
      </div>
    );
  }
}

export default BoobsController;

// part 3 - iteration 
// prepare the (boob)mixer in front of you and say

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      desiredSizeL:[0,0],
      desiredSizeR:[0,0],
      desiredLtitSz:0,
      desiredRtitSz:0,
      desiredLCoords:[0,0],
      desiredRCoords:[0,0],
      desiredLtitCoords:[0,0],
      desiredRtitCoords:[0,0],
      desiredBoobColor:"#ffffff",
      desiredTitColor:"#000000"
    }
  }

  render () {
  	// if redirection to blank page keeps happening, that means you need to wait until the next full moon 
  	if (SunCalc.getMoonIllumination(Date()). != 0.5) {
      return <Redirect to='/later' />
    }
    var stt = this.state;
    return (
    	<Router>
	        <div id="app" className="App">
	          	<Fragment>
	              	<Switch>
		              	<Route exact path="/" exact render={() => (

		                // bring the boobmixer and turn each knob so that you can get desired value for boob shape/size
		        		// everytime finishing rotating the knob you should say 'setState', if not, your desired boob spec will not fully applied 
		        		// if every change on the mixer is done, say,

				        <BoobsController 
				        sizeL={stt.desiredSizeL} sizeR={stt.desiredSizeR} 
				        LtitSz={stt.desiredLtitSz} RtitSz={stt.desiredRtitSz} 
				        LCoords={stt.desiredLCoords} RCoords={stt.desiredRCoords} 
				        LtitCoords={stt.desiredLtitCoords} RtitCoords={stt.desiredRtitCoords} 
				        boobColor={stt.desiredBoobColor} titColor={stt.desireTitColor} 
				        date={Date()} />

		        		// if you say this "BoobsController" block multiple times, chances to get the desired boobs getting higher.

		                )} />
		                <Route exact path="/later" exact render={() => (

		               		<div>try n days later</div>

		                )} />
	                </Switch>
	            </Fragment>
	        </div>
        </Router>
    );
  }
}

export default App;
