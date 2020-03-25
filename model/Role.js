var mongoose = require("mongoose");

var RoleSchema = new mongoose.Schema({
	title: {type: String, required: true},
	roleKey: {type: String, required: true},
	description: {type: String, required: true}
}, {timestamps: true});

RoleSchema.methods = {
    toJSON() {
        return {
            id: this._id,
            title: this.title,
            description: this.description,
            roleKey: this.roleKey
        }
    }
};

module.exports = mongoose.model("Role", RoleSchema);