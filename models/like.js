import { Schema, model, models } from "mongoose";

const newLikes = new Schema({

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

    isLiked: {
        type: Boolean,
        required: true
    }

})

const Like = models.Likes || model('Likes', newLikes)
export default Like