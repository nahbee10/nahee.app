const mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var fluidSchema = new Schema({
		fluid_id: { type: Schema.ObjectId, ref: 'Fluid' },
		type: { type: String, index: true, required: true},
	  	amount: {type:Number, index: true, required: true},
		created_at: {type:Date, default:Date.now, required: true},
		created_by: {type:Number, index: true, required: true},
		sex_id: { type: Number, index: true},
	  	trajectory: { type: [trajectorySchema], index: true}
	});

	var trajectorySchema = new Schema({
		time_stamps: {type:[Date], default:Date.now, required: true},
		owners: {type:[Number], index: true, required: true},
		body_parts: { type: [Number], index: true, required: true}
	});

    fluidSchema.statics.getRandomItemsFromQuery = function(typeQuery, itemCount, cb) {

        this.aggregate([
        	{ 
        		$match : { type : typeQuery } 
        	},
        	{
	            $sample: { size : itemCount }
	        }, {
	            $group: {
	                _id: "$_id",
	                document: { $push: "$$ROOT" }
	            }
	        }, {
	            $unwind: "$document"
	        }], cb);
    };

    mongoose.model('fluid',fluidSchema);
};
