const Partner = require('../models/partner');
const Sex = require('../models/sex');
const Orgasm = require('../models/orgasm');
const Mybody = require('../models/mybody');

const Promise = require("bluebird");

const axios = require('axios');

var currentSex, durationOfSex;
var timeFromLastRealOrgasm;
var affectionForPartner, partnerServerIP;
var painLevelOfBody;
var bestOrgasmsArr = [];
var firstTimeFlag = false;

function getCurrentSex(){
	return Sex.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, sex) {
	  currentSex = sex;
	});
}

function getPartner(){}
	return Partner.find({id: currentSex.partner_id}, function(err, partner){
		affectionForPartner = partner.my_affection_level;
		partnerServerIP = partner.server_address;
		if (partner.sex_count == 1){
			firstTimeFlag = true;
		}
	});
}

function getOrgasm(){
	return Orgasm.findOne({is_real: true}, {}, { sort: { 'created_at' : -1 } }, function(err, orgasm) {
	  timeFromLastRealOrgasm = Date() - orgasm.created_at;
	});
}

function getBestOrgasms(){
	return Orgasm.find({is_real: true}).sort({intensity: -1}).limit(3).exec( 
	    function(err, orgasms) {
	        bestOrgasmsArr = orgasms
	    }
	);
}

function getMyBody(){
	return Mybody.find({},function(err, body){
		var totalPain;
		for(var i = 0; i < body.parts.length; i++){
			totalPain += body.parts[i].painLevel;
		}
		averagePainLevel = totalPain / body.parts.length;
	});
}

export function checkSexGoesWell(){

	var counterForPromises = 0;

	Promise.resolve(getCurrentSex()).then(function() {
	    let promises = [];
		promises.push(getPartner());
		promises.push(getOrgasms());
		promises.push(getBestOrgasms());
		promises.push(getMyBody());

		return Promise.all(promises.map(function (promise) {
		  return promise.reflect();
		}))
		.then(response => {

			results.forEach(result => {
			     if(result.isFulfilled()){
			        counterForPromises ++;
			     } else {
			        console.log("couldn't get: ",result.reason());
			     }
			  });
			
		}).then(function() {
			if (counterForPromises == 4){
				if (timeFromLastRealOrgasm > durationOfSex /*no orgasm during this sex*/) && (durationOfSex > 900000 /*15min*/){
					if (painLevelOfBody > 6){
						if ((affectionForPartner > 8) && firstTimeFlag){
							sendMyBestKindsOfOrgasms();
						}else{
							//connection refused?
						}
					}
				}
			}

		}).catch(err=>{
			console.log(err);
		})
	})
}

function sendMyBestKindsOfOrgasms(){
	axios({
	  	method: 'post',
	  	url: partnerServerIP + '/api/random',
	  	data: {
	    	partner: bestOrgasmsArr
	  	}
	}).then(function (response) {
	    console.log(response);
	}).catch(function (error) {
	    console.log(error);
	});;
}
