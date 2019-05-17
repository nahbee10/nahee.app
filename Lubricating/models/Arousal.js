const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arousalSchema = new Schema({
	arousal_id: { type: Schema.ObjectId, ref: 'Arousal' },
	created_at: {type:Date, default:Date.now, required: true},
	stimuli: { type: [String], index: true, required: true},
  	resp_parts: {type: [Number], index: true, required: true},
	stage: {type: Number, index: true, required: true},
	sex_id: { type: Number, index: true}
});

module.exports = mongoose.model('arousal',arousalSchema);