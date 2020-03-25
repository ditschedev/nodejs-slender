var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	isConfirmed: {type: Boolean, required: true, default: 0},
	confirmKey: {type: String, required:false},
	status: {type: Boolean, required: true, default: 1},
	roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
	groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
}, {timestamps: true});

UserSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

UserSchema.methods = {

    toJSON() {
        return {
            id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
			email: this.email,
			roles: this.roles,
			groups: this.groups
        }
    }
};

module.exports = mongoose.model("User", UserSchema);