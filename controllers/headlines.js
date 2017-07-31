//Bring in our scrape script and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//Bring in the headline and note mongoose models
var Headline = require("../models/Headline")

module.exports = {
    //fetch is going to run the scrape function 
    //pass callback into function
    fetch: function(cb) {
        //run scrape
        scrape(function(data) {
        var articles = data;
        //go through each article and insert date
        for (var i=0; i < articles.length; i++) {
            articles[i].date = makeDate();
            articles[i].saved = false;
        }
        //run mongo function which takes headline and inserts into in collection articles
        Headline.collection.insertMany(articles, {ordered: false}, function (err, docs){
            cb(err, docs);
        })
    });
 },
 //delete property to remove article
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        //find all headlines in query
        Headline.find(query)
        //sort from most recent 
        .sort({
            _id: -1
        })
        //pass documents to callback function
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    //update any new articles scraped with id and update information passed to articles with info
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}