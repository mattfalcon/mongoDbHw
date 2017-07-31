//variable that makes a date
var makeDate = function () {
    //variable d
    var d = new Date();
    var formattedDate = "";
    //add month to string built in javascript function add 1 due to zero index
    formattedDate += (d.getMonth() + 1) + "_";
    //add date
    formattedDate += d.getDate() + "_";
    //add year
    formattedDate += d.getFullYear();

    return formattedDate;
};

//exports variable 
module.exports = makeDate;

