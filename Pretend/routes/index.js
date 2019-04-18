const express = require('express');
const Partner = require('../models/partner');
const Sex = require('../models/sex');
const Orgasm = require('../models/orgasm');
const Mybody = require('../models/mybody');

const router = new express.Router();
const Promise = require("bluebird");

var timeFromLastRealOrgasm, timeFromLastFakeOrgasm;
var emotionalIntimacy, estimatedArousalOfPartner;
var numbersOfSex;
var averageStimulationLevel, myMood, myPhysicalCondition;

router.get('/api/pretend', (req, res) => {
	var counterForPromises = 0;

	Promise.resolve(getRecentSex()).then(function() {
	    let promises = [];
	    promises.push(getSexCounts());
		promises.push(getPartner());
		promises.push(getOrgasms());
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

				var A1 = 5.7*myMood + 4*myPhysicalCondition + 25*numbersOfSex + 38;
				var B1 = 11*myPhysicalCondition + 7.8*numbersOfSex;
				var A2 = 4*myMood + 13*myPhysicalCondition + 21*numbersOfSex - 19.7;
				var B2 = 28*myPhysicalCondition - 3.2*numbersOfSex + 9;

				var P1 = 180000 + emotionalIntimacy*A1 + estimatedArousalOfPartner*B1;
				var P2 = 240000 - emotionalIntimacy*A2 - estimatedArousalOfPartner*B2;
				var P3 = 5 - emotionalIntimacy*0.28 + estimatedArousalOfPartner*0.9;

				var suggestedLevel = 0.52*myMood + 0.3*myPhysicalCondition + 2.5*averageStimulationLevel;

				var mappedSuggestedLevel = map_range(suggestedLevel,0,64,0,10);

				if (timeFromLastRealOrgasm <= P1 && timeFromLastFakeOrgasm > P2 && averageStimulationLevel >= P3){
					res.json({"pretendOrNot":true, "suggestedLevel": mappedSuggestedLevel});
				}else{
					res.json({"pretendOrNot":false, "suggestedLevel": mappedSuggestedLevel});
				}
			}

		}).catch(err=>{
			console.log(err);
			return res.status(500).send({error:'database failure'});
		})
	})

});

function getRecentSex(){
	return Sex.find({}).sort( { 'created_at' : -1 }).exec();
}

function getSexCounts(){
	return Sex.find({
	    time:{ 
	        '$gte': sex.start,
	        '$lte': Date()
	    }
	},function(err, sex){
		numbersOfSex = sex.length;
	});
}

function getPartner(){}
	return Partner.find({id: sex.partnerId}, function(err, partner){
		emotionalIntimacy = partner.intimacyLevel;
		estimatedArousalOfPartner = partner.estimatedArousal;
	});
}

function getOrgasms(){
	return Orgasm.find({sex: sex.id}, function(err, orgasms){
		timeFromLastRealOrgasm = findLastOrgasm(orgasms, true);
		timeFromLastFakeOrgasm = findLastOrgasm(orgasms, false);
	});
}

function getMyBody(){
	return Mybody.find({},function(err, body){
		myMood = body.currentMood;
		myPhysicalCondition = body.currentPhysicalCondition;
		
		var totalStimulation;
		for(var i = 0; i < body.parts.length; i++){
			totalStimulation += body.parts[i].stimulationLevel;
		}
		averageStimulationLevel = totalStimulation / body.parts.length;
	});
}

function findLastOrgasm(orgasms, isReal){
	var timeFromLastOrgasm;
	var occurance = orgasms.length-1;
	var counter = occurance;

	while counter > 0 {
		if (orgasms[counter].isReal == isReal){
			timeFromLastOrgasm = orgasms[length-1].time - Date();
			break;
		}else{
			counter --;
		}

		if (counter == 0){
			if (timeFromLastOrgasm = undefined){
				timeFromLastOrgasm = START_OF_SEX;
			}
		}
	} 
	return timeFromLastOrgasm;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
