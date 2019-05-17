const express = require('express');
const Fluid = require('../models/fluid');
const Sex = require('../models/sex');
const Orgasm = require('../models/orgasm');
const Arousal = require('../models/arousal');

const router = new express.Router();

var currentArousalLevel;

function arousedFromMemories(){

	var arousal = new Arousal();

	arousal.created_at = Date();
	arousal.stimuli = ["memories"];
	arousal.resp_parts = ["vagina", "cervix", "clitoris", "labia"];
	if (currentArousalLevel < 5){
		arousal.stage = currentArousalLevel*1.24;
	}else{
		arousal.stage = currentArousalLevel*1.08;
	}
	//3,8,13
	arousal.save(function(err){
		//4,9,14
		if(err){
			console.error(err);
			res.json({result:"fail"});
			return;
		}
		res.json({result:"success"});
	});
}

router.get('/api/fluid', (req, res) => {
	//2
	Fluid.getRandomItemsFromQuery(req.query.type, 3, function(err, fluids) {
		//3
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(fluids);
        }
    });
	//2
    arousedFromMemories();
});

router.get('/api/sex/:sex_id', (req, res) => {
	//7
	Sex.find({ _id: req.params.sex_id}, function(err, sex){
		//8
		if(err) return res.status(500).send({error:'database failure'});
		res.status(200).json(sex);
	})
	//7
	arousedFromMemories();
});

router.get('/api/orgasm/:orgasm_id', (req, res) => {
	//12
	Orgasm.find({ _id: req.params.orgasm_id}, function(err, orgasm){
		//13
		if(err) return res.status(500).send({error:'database failure'});
		res.status(200).json(orgasm);
	})
	//12
	arousedFromMemories();
});

router.get('/api/recent_arousal', (req, res) => {
	//*2
	Arousal.find({}, null, {sort: { created_at : -1 }}, function(err, arousal) { 
		//*3
		if(err) return res.status(500).send({error:'database failure'});
		res.status(200).json(arousal);
		currentArousalLevel = arousal.stage;
	});
	
});

router.post('/api/arousal', (req, res) => {

	var arousal = new Arousal();

	var chunk = req.body;
	arousal.created_at = chunk.created_at;
	arousal.stimuli = chunk.stimuli;
	arousal.resp_parts = chunk.resp_parts;
	arousal.stage = chunk.stage;
	arousal.sex_id = chunk.sex_id;
	
	arousal.save(function(err){
		if(err){
			console.error(err);
			res.json({result:"fail"});
			return;
		}

		res.json({result:"success"});
	});

});


router.post('/api/fluid', (req, res) => {
	var fluid = new Fluid();

	var chunk = req.body;
	fluid.type = chunk.type;
	fluid.amount = chunk.amount;
	fluid.created_at = chunk.created_at;
	fluid.created_by = chunk.created_by;
	fluid.sex_id = chunk.sex_id;

	fluid.trajectory.push({
		time_stamps:chunk.trajectory.time_stamps,
		owners:chunk.trajectory.owners,
		body_parts:chunk.trajectory.body_parts
	});
	//*7
	fluid.save(function(err){
		//*8
		if(err){
			console.error(err);
			res.json({result:"fail"});
			return;
		}

		res.json({result:"success"});
	});

});


module.exports = router

