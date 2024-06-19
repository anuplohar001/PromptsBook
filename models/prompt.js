import { Schema, model, models } from "mongoose";

const newPrompt = new Schema({
    prompt:{
        type: String,
        required: true
    },
    
    tag: {
        type: String,
        required: true
    },

    id: {
        type: String,
        required: true
    }
})

const Prompt = models.prompts || model("prompts", newPrompt);
export default Prompt