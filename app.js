const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { query } = require("express");

const app = express();
var items = ["Testing of i3","Bash Scripting"];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.get("/",function(req,res){
    var currentDay = new Date();
    var options ={
       weekday:"long",
       day:"numeric",
       month:"long",
    };
    var day = currentDay.toLocaleDateString("en-US",options);
    res.render("list",{
        KindofDay:day,
        newListItems:items
    });
});

app.post("/",function(req,res){
    var item = req.body.newList;
    items.push(item);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server started on the port 3000");
});
