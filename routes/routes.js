const fs = require('fs');
//require csvjson
const csvjson = require('csvjson');
let dataString = ""
//convert csv to json

let years = [];
let goalsScored = [];
let attendance = [];
let Heading = "";
let dropdown = 1;
exports.homeRoute = (req, res, next) => {
    years = [];
    goalsScored = [];
    attendance = [];
    Heading = "";
    dropdown = 1;
    res.render('index')
}
exports.upload = (req, res, next) => {

    fs.readFile(req.file.path, 'utf8', function (err, data) {
        if (err) throw err;
        dataString = data;
        let json = csvjson.toObject(dataString);
        //loop through json and insert first index to an array

        for (let i = 0; i < json.length; i++) {
            years.push(json[i].Year);
        }
        // console.log(years);

        //loop thorough json and insert seventh index to an array

        for (let i = 0; i < json.length; i++) {
            goalsScored.push(json[i].GoalsScored);
        }

        //loop through json and insert last index to an array

        for (let i = 0; i < json.length; i++) {
            attendance.push(json[i].Attendance);
        }
        // console.log(attendance);

    });
    //redirect to get /chart
    res.redirect('/chart');

    if (req.body.dropdown == "1") {
        Heading = "Goals Scored";
    }
    else {
        Heading = "Attendance(In thousands)";
    }
    dropdown = req.body.dropdown
}

exports.drawChart = (req, res, next) => {


    //convert array of strings to integers
    for (let i = 0; i < years.length; i++) {
        years[i] = parseInt(years[i]);
    }
    for (let i = 0; i < goalsScored.length; i++) {
        goalsScored[i] = parseInt(goalsScored[i]);
    }
    for (let i = 0; i < attendance.length; i++) {
        attendance[i] = parseInt(attendance[i]);
    }

    res.render('chart', {
        years: years,
        goalsScored: goalsScored,
        attendance: attendance,
        Heading: Heading,
        dropdown: dropdown
    });
    //To erase previous state
    years = [];
    goalsScored = [];
    attendance = [];
    Heading = "";
    dropdown = 0;
}








