var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Role = require('./role.model');

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

UserSchema.virtual("getRoles").get(function() {
	let result = Array.from(this.roles.map(role => role.roleKey));
	this.groups.forEach(group => {
		result.push(...(group.roles.map(role => role.roleKey)));
	});
	return result;
});

UserSchema.pre('save', function(next) {
	if(!this.isModified('password')) return next();
	const user = this;
	bcrypt.genSalt(12, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods = {

	tryLogin(password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, this.password, function(err, match) {
				if (err) reject(err);
				if(!match) reject("Invalid email or password"); 
				resolve();
			});
		});
	},

    toJSON() {
        return {
            id: this._id,
            firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			isConfirmed: this.isConfirmed
        }
    }
};

module.exports = mongoose.model("User", UserSchema);