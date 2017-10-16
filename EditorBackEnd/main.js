/**
 * Created by thisura on 10/2/17.
 */
/**
 * Created by thisura on 6/21/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

//Database Connection
mongoose.connect('mongodb://localhost/goodmason_editor');

//Database schemas
var editors = mongoose.model('editors',{Username: String, Name: String, Email:String});
var contents = mongoose.model('contents',{ID: String, User: String, Date: String, Title: String, Content: String, Status: String});


//server startup
app.listen(8086, function (error) {
    console.log("\n +-+-+-+-+-+-+-+-+-+-+\n |g|o|o|d|M|a|s|o|n|\n +-+-+-+-+-+-+-+-+-+-+");
    console.log("[INFO] GOODMASON EDITORS API RUNNING ON http://localhost:8086/");
});

//Get all editors
app.get("/editors",function (req,res) {
    console.log("[ROUTE CALLED][GET] /editors");
    editors.find(function (error,editors) {
        if(error){
            console.log("[ERROR] FETCHING EDITORS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING EDITORS FROM DATABASE SUCCESS");
        res.json(editors);
    });
});

//Delete an editor
app.delete("/editors/:id",function (req,res) {

    var deleditor = req.params.id;

    console.log("[ROUTE CALLED][DELETE] /editors/" + deleditor);
    editors.deleteOne({Username:deleditor},function (error,editors) {
        if(error){
            console.log("[ERROR] DELETING ONE EDITOR FAILED");
            res.end();
        }
        console.log("[DB] DELETING ONE EDITOR SUCCESS");
        res.json(editors);
    });
});

//Add new editor
app.post("/editors",function (req,res) {
    console.log("[ROUTE CALLED][POST] /editors");

    var newEditor = new editors(req.body);

    newEditor.save(function (error,newEditor) {
        if(error){
            console.log("[ERROR] ADDING A NEW EDITOR TO DATABASE FAILED");
            res.end();
        }
        console.log("[DB] ADDING A NEW EDITOR TO DATABASE SUCCESS");
        res.json(newEditor);
    });
});

//Get all contents
app.get("/contents",function (req,res) {
    console.log("[ROUTE CALLED][GET] /contents");
    contents.find(function (error,contents) {
        if(error){
            console.log("[ERROR] FETCHING CONTENTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING CONTENTS FROM DATABASE SUCCESS");
        res.json(contents);
    });
});

//Find content by status
app.get("/contents/status/:statusID",function (req,res) {
    var status=req.params.statusID;
    console.log("[ROUTE CALLED][GET] /contents/" + status);
    contents.find({Status:status},function (error,contents) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC CONTENTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC CONTENTS FROM DATABASE SUCCESS");
        res.json(contents);
    });
});

//Update contents(Accept or Reject ad contents)
app.put("/contents/:contentID",function (req,res) {
    var contID = req.params.contentID;
    console.log("[ROUTE CALLED][PUT] /contents/" + contID);
    contents.findOne({ID:contID}, function (error,contents) {
        if(error){
            res.status(500);
            res.end();
        }
        contents.Status = req.body.Status;
        contents.save(function (error,contents) {
            if(error){
                res.status(500).end();
            }
            res.json(contents);
        });
    });
});

//Delete an ad content
app.delete("/contents/:id",function (req,res) {

    var delId = req.params.id;

    console.log("[ROUTE CALLED][DELETE] /contents/" + delId);
    contents.deleteOne({ID:delId},function (error,contents) {
        if(error){
            console.log("[ERROR] DELETING ONE AD CONTENT FAILED");
            res.end();
        }
        console.log("[DB] DELETING ONE AD CONTENT SUCCESS");
        res.json(contents);
    });
});

//Get all stocks
app.get("/stocks",function (req,res) {
    console.log("[ROUTE CALLED][GET] /stocks");
    stocks.find(function (error,stocks) {
        if(error){
            console.log("[ERROR] FETCHING STOCKS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING STOCKS FROM DATABASE SUCCESS");
        res.json(stocks);
    });
});



//Find requests by requestID
app.get("/requests/:requestsId",function (req,res) {
    var reqId=req.params.requestsId;
    console.log("[ROUTE CALLED][GET] /requests/" + reqId);
    requests.find({requestID:reqId},function (error,requests) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC REQUESTS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC REQUESTS FROM DATABASE SUCCESS");
        res.json(requests);
    });
});

//Find stocks by userID
app.get("/stocks/:userId",function (req,res) {
    var reqId=req.params.userId;
    console.log("[ROUTE CALLED][GET] /stocks/" + reqId);
    stocks.find({userID:reqId},function (error,stocks) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC STOCKS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC STOCKS FROM DATABASE SUCCESS");
        res.json(stocks);
    });
});



//Add new request
app.post("/requests",function (req,res) {
    console.log("[ROUTE CALLED][POST] /requests");

    var newRequest = new requests(req.body);

    newRequest.save(function (error,newRequest) {
        if(error){
            console.log("[ERROR] ADDING A NEW REQUEST TO DATABASE FAILED");
            res.end();
        }
        console.log("[DB] ADDING A NEW REQUEST TO DATABASE SUCCESS");
        res.json(newRequest);
    });
});





