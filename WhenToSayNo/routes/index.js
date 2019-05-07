const express = require('express');
const Req = require('../models/request');
const Partner = require('../models/partner');
const Desire = require('../models/desire');
const Anxiety = require('../models/anxiety');
const Partner = require('../models/partner');
const MyBody = require('../models/mybody');
const MindCoeff = require('../models/mind/coeff');

const router = new express.Router();
const Promise = require("bluebird");

var requestTimeout;
var coeffsForWllngnssForReq;
var levelOfDesireForReq;
var levelOfCurrentAnxiety;
var myPhysicalCondition;
var partnerId;
var willingnessForReq;

router.post('/api/sex/request', (req, res) => {
	var reqFromPartner = new Req();

	var chunk = req.body;
	reqFromPartner.action = chunk.action;
	reqFromPartner.category = chunk.category;
	reqFromPartner.urgency = chunk.urgency;
	reqFromPartner.subject = chunk.subject;
	reqFromPartner.timeout = chunk.timeout;

	var requestIP = req.headers['x-forwarded-for'];
	var requestedAction = chunk.action;
	requestTimeout = chunk.timeout;

	var counterForPromises = 0;

	Promise.resolve(getPartnerId(requestIP)).then(function() {
		let promises = [];
		promises.push(getMyMindCoeff("willingnessForReq"));
	    promises.push(getMyDesireLevel(partnerId, requestedAction));
		promises.push(getMyRecentAnxiety());
		promises.push(getMyBodyCondition());

		return Promise.all(promises.map(function (promise) {
		  return promise.reflect();
		}))
		.then(response => {
			results.forEach(result => {
			    if(result.isFulfilled()){
			       	counterForPromises ++;
			    } else {
			       	console.log("couldn't get: ", result.reason());
			    }
			});
		})
		.then(function() {
			if (counterForPromises == 4){
				willingnessForReq = (coeffsForWllngnssForReq[0]*levelOfDesireForReq + coeffsForWllngnssForReq[1]*myPhysicalCondition + coeffsForWllngnssForReq[2]*levelOfCurrentAnxiety)/3;
				if (willingnessForReq > 6){
					reqFromPartner.accepted = true;
					reqFromPartner.save(function(err){
						res.status(200).send({message:'Ok'});
					});
				}
				else{
					// reqFromPartner.accepted = false;
					// reqFromPartner.save(function(err){
					// 	res.status(406).send({message:"I don't want to do that"});
					// });
					worsenAnxietyWhile(function () { return levelOfCurrentAnxiety < 8; }).then(function(){
						willingnessForReq = (coeffsForWllngnssForReq[0]*levelOfDesireForReq + coeffsForWllngnssForReq[1]*myPhysicalCondition + coeffsForWllngnssForReq[2]*levelOfCurrentAnxiety)/3;
						if (willingnessForReq > 6){
							reqFromPartner.accepted = true;
							reqFromPartner.save(function(err){
								res.status(200).send({message:'Ok'});
							});
						}
					})
				}
			}
		})
		.catch(err=>{
			console.log(err);
			return res.status(500).send({error:'database failure'});
		})
	})
});

function worsenAnxietyWhile(condition){
    return Promise.resolve(worsenCurrentAnxiety()).then(function() {
    	return (levelOfCurrentAnxiety < 8) ? worsenAnxietyWhile(condition) : ""
	});	
}

function worsenCurrentAnxiety(){
	return Anxiety.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, anxiety) {
	  	if (anxiety !== null){
			levelOfCurrentAnxiety = anxiety.intensity;
		}

		var leftTimeUntilTimeout = requestTimeout - Date();

		anxiety.intensity = levelOfCurrentAnxiety * (Math.random()+1+1/leftTimeUntilTimeout);
		
		anxiety.save(function(err){
			if(err){
				console.error(err);
			}
			console.log("success");
		});
	});
}

function getMyMindCoeff(coeffName){
	return MindCoeff.find({name: coeffName}, function(err, mindCoeff){
		coeffsForWllngnssForReq = mindCoeff.coeffs_arr;
	});
}

function getPartnerId(subjectIP){
	return Partner.find({address: subjectIP}, function(err, partner){
		if (partner.length != 0){
			partnerId = partner.partner_id
		}
	});
}

function getMyDesireLevel(subjectId, requestedAction){
	return Desire.find({subject: subjectId, action: requestedAction}, function(err, matchedDesire){
		if (matchedDesire.length == 0){
			levelOfDesireForReq = 0;
		}else{
			levelOfDesireForReq = matchedDesire.intensity;
		}
	});
}

function getMyRecentAnxiety(){
	return Anxiety.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, anxiety) {
	  	if (anxiety !== null){
			levelOfCurrentAnxiety = anxiety.intensity;
		}
	});
}

function getMyBody(){
	return MyBody.find({},function(err, body){
		myPhysicalCondition = body.currentPhysicalCondition;
	});
}