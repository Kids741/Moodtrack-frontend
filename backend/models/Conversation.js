import mongoose from "mongoose";


const convSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model("Conversation", convSchema);