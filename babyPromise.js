import React, Component from 'react'
import ReactDOM from 'react-dom'
import Sperm from 'donated-sperm'

var IDEAL_BIOLOGICAL_FATHER = {age:35,married:true,eye_color:'brown',profession:'mathmatician'}

var App = createClass({
  planBaby: function(time, sperm){
    setTimeout(() => {
        api.post('/api/baby',{papa:sperm}).then(res=>{return res.body});  
     }, time);
  },
  render: function () {
    var nineYrs = 9*365*24*60*60;
    return (
    	<button onClick={this.planBaby(nineYrs, Sperm.get(IDEAL_BIOLOGICAL_FATHER)}>
    		✨🍆✨
    	</button>
    	)
	}
});

export default App;
