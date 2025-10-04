
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    blogId: {
              ref: "blogdata",
              type: mongoose.Schema.Types.ObjectId,
    },

    userId: {
              ref: "usermodel",
              type: mongoose.Schema.Types.ObjectId },


    comment: {
             type: String,
             required: true,
    },

    createdAt: {
             type: String,
             default:Date.now
             // required:true
    },
});

const Commentmodel = mongoose.model("commentmodel", CommentSchema);

module.exports = Commentmodel;
