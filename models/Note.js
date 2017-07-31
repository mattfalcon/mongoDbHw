var mongoose = require("mongoose");

//create schema 
var Schema = mongoose.Schema;

//new schema that requires headline and note
var noteSchema = new Schema({
    //associated article to attach note to
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"   
    },
    date: String,
    noteText: String
});

//export headline
var Note = mongoose.model("Note", noteSchema);


module.exports = Note;