import { Schema, model, models } from "mongoose";

const newLikes = new Schema({

    postid: {
        type: Schema.Types.ObjectId,
        required:true
    },

    userid: {
        type: Schema.Types.ObjectId,
        required:true
    },

    isLiked: {
        type: Boolean,
        required: true
    }

})

const Like = models.Likes || model('Likes', newLikes)
export default Like