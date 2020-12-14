const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { query } = require("express");

const app = express();
let items = ["Testing of i3","Bash Scripting"];
let workItems =[];
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
        listTitle:day,
        newListItems:items  
    });
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{
        listTitle:"Work",
        newListItems:workItems
    });
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000,function(){
    console.log("Server started on the port 3000");
});
