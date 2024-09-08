import {Schema, model, models} from "mongoose";

const newComments = new Schema({
    
    postid: {
        type: Schema.Types.ObjectId,
        ref: 'prompts',
        required: true
    },

    padmin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    isLike: {
        type: Boolean
    }
})

const comments = models.comments || model("comments", newComments)
export default comments