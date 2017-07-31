//scrape script
//===============

//Require request and cheerio, making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");

//variabel to export at bottom with function callback (cb)
var scrape = function (cb) {
    
    //request NYTIMES account for error, response, and body
    request("https://www.mavsmoneyball.com/", function(err, res, body){

        //cheerio load on body with $ as selector 
        var $ = cheerio.load(body);
        //new array of articles
        var articles = [];
        //select all theme summaries with each theme summary grab text 
        $(".c-entry-box--compact__body").each(function(i, element) {

            //cut off any white space at the end for story-heading and summary
            //both are children of theme-summary
            var head = $(this).children(".c-entry-box--compact__title").text().trim();
            var sum= $(this).children(".p-dek.c-entry-box--compact__dek").text().trim();

            //if head and sum exists 
            if(head && sum){
                //replace rejex method cleans up text with white space
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s)/gm, " ").trim();
                //makes an object out of headneat and sumneat and assigns to headline and summary
                //note headline and summary are required for the model
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                //push new datatoadd into articles array
                articles.push(dataToAdd) ;
            }        
     });
     //callback function sends us articles 
     cb(articles);
    });
};
//export scrape in order to use it throughout the program
module.exports = scrape;