const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sexSchema = new Schema({
	sex_id: { type: Schema.ObjectId, ref: 'Sex' },
	created_at: {type: Date, default:Date.now, required: true},
	place: {type: String, index: true, required: true},
	partner: { type: Number, index: true, required: true},
	duration: { type: Number, index: true, required: true},
	moods: {type: [Number], index: true, required: true},
	orgasms: { type: [Number], index: true, required: true},
	arousals: { type: [Number], index: true, required: true},
	fluids: { type: [Number], index: true, required: true},
	contacts: { type: [Number], index: true, required: true}
});

module.exports = mongoose.model('sex',sexSchema);
