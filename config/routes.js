//Server Routes
//================

//Bring in the scrap function from our scripts directory
var scrape = require("../scripts/scrape");

//Bring headlines and notes from the controlle
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    //this route renders the homepage
    router.get("/", function(req, res) {
        res.render("home");
    });
    //this route renders the saved handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

//route api fetch run this function
//passing in request and getting back response
    router.get("/api/fetch", function(req, res) {
        //go to headlines controller and run fetch
        headlinesController.fetch(function(err, docs) {
            //if no new articles added 
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });

//whenever router hits api headlines take in users request and respond appropiately
    router.get("/api/headlines", function(req, res) {
        //users request defined by query
        var query = {};
        //if user specifies query will set to that
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function(data) {
            res.json(data);
        });
    });

//
    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        //set query to request params id
        query._id = req.params.id;
        //pass that into headlinescontroller function
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });
//
    router.patch("/api/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data){
            res.json(data);
        });
    });
//
    router.get("/api/notes/:headline_id?", function(req, res){
        var query = {};
        //if params that user set exists then set queryid to equal param
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        //pass in query for specific param and return data associated with that and a front end response
        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });
// 
    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        //run delete function 
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });
//post goes to api notes and runs notescontroller save function
    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data){
            //returns in json format
            res.json(data);
        });
    });
    }