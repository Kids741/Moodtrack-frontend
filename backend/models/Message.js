import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
role: { type: String, enum: ["user","assistant","system"], required: true },
content: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Message", messageSchema);