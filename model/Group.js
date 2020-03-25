var mongoose = require("mongoose");

var GroupSchema = new mongoose.Schema({
	title: {type: String, required: true},
	groupKey: {type: String, required: true},
	description: {type: String, required: true},
    weight: {type: Number, required: true},
    roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

GroupSchema.methods = {
    toJSON() {
        return {
            id: this._id,
            title: this.title,
            description: this.description,
            groupKey: this.groupKey,
            weight: this.weight
        }
    }
};

module.exports = mongoose.model("Group", GroupSchema);