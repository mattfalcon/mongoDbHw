//Controller for our notes
//=========================

var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
    get: function(data, cb) {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    //taking data from user and callback function
    save: function(data, cb) {
        //created object newNote
        var newNote = {
            //headline Id associated with note being created
            _headlineId: data._id,
            date: makeDate(),
            //noteText wihch is what user types in
            noteText: data.noteText
        };
        //takes note and creates one
        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(doc);
                //pass document to callback function
                cb(doc);
            }
        });
    },
    //removing note associated with article
    delete: function(data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};