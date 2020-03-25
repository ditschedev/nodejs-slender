var mongoose = require("mongoose");

var GroupSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
    weight: {type: Number, required: true},
    isDefault: {type: Boolean, required: true, default: 0},
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
            isDefault: this.isDefault,
            weight: this.weight,
            roles: this.roles
        }
    }
};

GroupSchema.pre('save', function(next) {
    // TODO: if isDefault == true -> Set isDefault to false on all others
    return next();
});

module.exports = mongoose.model("Group", GroupSchema);