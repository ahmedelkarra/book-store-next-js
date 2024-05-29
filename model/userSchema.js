const mongoose = require("mongoose")

let NoteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"]
    }
})

module.exports = mongoose.model.Note || mongoose.model("Note", NoteSchema);
