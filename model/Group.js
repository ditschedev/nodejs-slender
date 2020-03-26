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
    if(this.isModified('isDefault')) {
        if(!this.isDefault) {
            this.constructor.findOne({isDefault: true}).then((group) => {
                if(!group) {
                    this.isDefault = true;
                    return next('No default group set');
                }
                next();
            });
        } else {
            this.constructor.find().then((groups) => {
                groups.forEach(group => {
                    group.isDefault = false;
                    group.save();
                });
                this.isDefault = true;
            });
        }
    }
    next();
});


module.exports = mongoose.model("Group", GroupSchema);