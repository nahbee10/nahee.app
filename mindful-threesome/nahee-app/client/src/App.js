//Nahee-app/client/src/App.js

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import createClass from 'create-react-class';

import axios from 'axios'

const baseURL = "http://142.93.61.73:4000"

const api = axios.create({
  baseURL
})


var App = createClass({

  componentDidMount: function(){
  	this.sendMyRules();
  },
  sendMyRules: function(){

	var obj = new Object();

	obj.parts = [
	{
	  name: "mouth",
	  counterpartName: "mouth",
	  duration: 10000
	},
	{
	  name: "mouth",
	  counterpartName: "nipple",
	  duration: 7000
	},
	{
	  name: "mouth",
	  counterpartName: "vagina",
	  duration: 20000
	},
	{
	  name: "hand",
	  counterpartName: "vagina",
	  duration: 15000
	},
	{
	  name: "penis",
	  counterpartName: "vagina",
	  duration: 120000
	},
	{
	  name: "penis",
	  counterpartName: "mouth",
	  duration: 0
	},
	{
	  name: "penis",
	  counterpartName: "hand",
	  duration: 20000
	},
	{
	  name: "ALL",
	  counterpartName: "anus",
	  duration: 0
	}
	];

	obj.botheringWords = ["love", "sexy", "hot", "awesome", "great", "inside", "more"];
	var rulesJson = JSON.stringify(obj);

	api.post('/api/mindfulRules', {rules : rulesJson})
    .then(res => {
      if (res.data.error != null){
        console.log(res.data.error)
      }else{
        console.log("success");
      }
    })
  },
  render: function () {
    return (
      <div></div>
      )
  }
});

export default App;
