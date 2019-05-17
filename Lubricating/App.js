import React, { Component , Fragment} from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import './App.css';

import createClass from 'create-react-class';

import axios from 'axios'

const api = axios.create({
  "http://142.93.61.73:4000"
})

var App = createClass({
  getInitialState: function () {
    return { 
    	lubricantElements : ""
     };
  },

  componentDidMount: function(){
    setInterval(this.getArousalLevel(), 3000);
  },
  getRdmLubricationData: function(){
    //1
    api.get('/api/fluid?type="vaginal_lubricant"').then(res => { 
    	var retrievedFluids = res.data;
      //4
    	this.readRdmLubricationData(retrievedFluids);
    });
  },
  readRdmLubricationData: function(data){
  	console.log(data);
    for (var i = 0; i < data.length; i++) {
		var fluidFrom = data[i].sex_id;
		//5
    this.getSexData(fluidFrom);
	}
  },
  getSexData: function(sex_id){
    //6
    api.get('/api/sex/'+sex_id).then(res => { 
    	var retrievedSex = res.data;
      //9
    	this.readSexData(retrievedSex);
    });
  },

  readSexData: function(data){
  	console.log(data);
  	var orgasmsFromSex = data.orgasms;
  	for (var j = 0; j < orgasmsFromSex.length; j++) {
      //10
  		this.getOrgasmData(orgasmsFromSex[j]);
  	}
  },

  getOrgasmData: function(orgasm_id){
    //11
    api.get('/api/orgasm/'+orgasm_id).then(res => { 
    	var retrievedOrgasm = res.data;
      //14
    	this.readOrgasmData(retrievedOrgasm);
    });
  },

  readOrgasmData: function(data){
    console.log(data);
  },

  getArousalLevel: function(){
    //*1
    api.get('/api/recent_arousal').then(res => { 
    	var arousalNow = res.data;
      //*4
    	this.checkArousalLevel(arousalNow);
    });
  },

  checkArousalLevel: function(data){
    var arousalLevel = data.stage;
    if ( arousalLevel > 5 ){
      //*5
    	this.fillVaginaDiv();
      //*5
    	this.postLubricatingData();
    }
  },

  fillVaginaDiv: function(){
  	var currentLubricant = this.state.lubricantElements;
    var newLubricant = React.createElement("div", {style: {backgroundColor: "blue"}, className:"lubricant"}, 💧);
    this.setState({
    	lubricantElements : currentLubricant + newLubricant
    });
  },

  postLubricatingData: function(){
  	var lubricatingAmount = document.getElementsByClassName('lubricant').length;
    //*6
    api.post('/api/fluid', {type:"vaginal_lubricant", amount:lubricatingAmount, created_at:Date(), created_by:0})
    .then(res => {
      if (res.data.error != null){
        console.log("fail",res.data.error);
      }else{
        console.log("success");
      }
    })
  },

  render: function () {
    var myThis = this;
    return (
      <Router>
        <div id="app" className="App">
          <Fragment>
              <Switch>
              <Route exact path="/" exact render={() => (
                <div className="vagina" style={{width:"100%", height:"100%"}}> 
                  {this.state.lubricantElements}
                </div>
                )} />

              </Switch>
            </Fragment>
          </div>
        </Router>
      
      )
  }

});


export default App;
