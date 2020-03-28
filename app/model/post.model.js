var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	body: {type: String, required: true},
    isPublished: {type: Boolean, required: true, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

PostSchema.methods = {

    toJSON() {
        return {
            id: this._id,
            title: this.title,
            description: this.description,
            body: this.body,
            isPublished: this.isPublished,
            author: this.author
        }
    }

};

module.exports = mongoose.model("Post", PostSchema);