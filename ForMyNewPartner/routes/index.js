const express = require('express');
const Partner = require('../models/partner');
const Sex = require('../models/sex');
const Orgasm = require('../models/orgasm');
const Mybody = require('../models/mybody');

const router = new express.Router();

var checkSexGoesWell = require('Helper');

router.post('/api/sex', (req, res) => {
	var sex = new Sex();

	var chunk = req.body;
	sex.created_at = chunk.created_at;
	sex.place = chunk.place;
	sex.partner = chunk.partner;
	
	sex.save(function(err){
		if(err){
			console.error(err);
			res.json({result:"fail"});
			return;
		}

		res.json({result:"success"});
	});

});

router.put('/api/sex/:sex_id', (req, res) => {
	var sex = new Sex();

	Sex.find({ _id: req.params.sex_id }, function(err, sex){
		var chunk = req.body;
		sex.duration = chunk.duration;
		sex.mood = chunk.mood;
		sex.was_satisfactory = chunk.was_satisfactory;
		if (chunk.duration != undefined){ partner.duration = chunk.duration }
		if (chunk.mood != undefined){ partner.mood = chunk.mood }
		if (chunk.was_satisfactory != undefined){ partner.description = chunk.description }

		sex.save(function(err){
			if(err){
				console.error(err);
				res.json({result:"fail"});
				return;
			}

			res.json({result:"success"});
		});
	});
});

router.post('/api/orgasm', (req, res) => {
	var orgasm = new Orgasm();

	var chunk = req.body;
	orgasm.created_at = chunk.created_at;
	orgasm.sex_id = chunk.sex_id;
	orgasm.partner_id = chunk.partner_id;
	orgasm.is_real = chunk.is_real;
	orgasm.type = chunk.type; /* */
	orgasm.body_position = chunk.body_position;
	orgasm.role = chunk.role;
	orgasm.intensity = chunk.intensity;
	orgasm.sounds = chunk.sounds;

	orgasm.save(function(err){
		if(err){
			console.error(err);
			res.json({result:"fail"});
			return;
		}

		res.json({result:"success"});
	});

	checkSexGoesWell();

});

router.post('/api/partner', (req, res) => {
	var partner = new Partner();

	var chunk = req.body;
	partner.name = chunk.name;
	partner.address = chunk.address;
	partner.meet_when = chunk.meet_when;
	partner.meet_where = chunk.meet_where;
	partner.libido = chunk.libido;
	partner.description = chunk.description;
	partner.my_affection_level = chunk.my_affection_level;
	partner.compatibility = chunk.compatibility;
	partner.sex_count = chunk.sex_count;

    partner.save(function(err){
		if(err){
			console.error(err);
			res.json({result:0});
			return;
		}

		res.json({result:1});
	});

});

router.put('/api/partner/:partner_id', (req, res) => {
	var partner = new Partner();

	Partner.find({ _id: req.params.partner_id }, function(err, partner){
		var chunk = req.body;
		if (chunk.address != undefined){ partner.address = chunk.address }
		if (chunk.libido != undefined){ partner.libido = chunk.libido }
		if (chunk.description != undefined){ partner.description = chunk.description }
		if (chunk.my_affection_level != undefined){ partner.my_affection_level = chunk.my_affection_level }
		if (chunk.compatibility != undefined){ partner.compatibility = chunk.compatibility }
		if (chunk.sex_count != undefined){ partner.sex_count = chunk.sex_count }

	    partner.save(function(err){
			if(err){
				console.error(err);
				res.json({result:0});
				return;
			}
			res.json({result:1});
		});
	});
});