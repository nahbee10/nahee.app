const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgasmSchema = new Schema({
	orgasm_id: { type: Schema.ObjectId, ref: 'Orgasm' },
	created_at: {type:Date, default:Date.now, required: true},
	sex_id: { type: Number, index: true, required: true},
	partner_id: {type:Number, index: true, required: true},
	is_real: { type: Boolean, index: true, required: true},
	type: { type: String, index: true, required: true},
	body_position: { type: [bodyCoordSchema], index: true, required: true},
	role: { type: String, index: true, required: true},
  	intensity: {type:Number, index: true, required: true},
	sounds: { type: [String], index: true, required: true}
});

module.exports = mongoose.model('orgasm',orgasmSchema);
