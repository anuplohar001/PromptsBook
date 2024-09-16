import { Schema, model, models } from "mongoose";

const newStory = new Schema({

    prompt: {
        type: String
    },

    expiresAfter: {
        type: Date
    }
})

const Story = models.story || model("story", newStory);
export default Story