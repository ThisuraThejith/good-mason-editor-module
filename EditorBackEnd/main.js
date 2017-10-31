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
var users = mongoose.model('users',{User: String, Date: String, Location: String, Specialty: String, Likes: Number, Dislikes: Number, Status: String})
var responses = mongoose.model('responses',{User : String, Date: String, Comment: String, Status: String});

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

//Update contents(Approve or Reject ad contents)
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

//Get all users
app.get("/users",function (req,res) {
    console.log("[ROUTE CALLED][GET] /users");
    users.find(function (error,users) {
        if(error){
            console.log("[ERROR] FETCHING USERS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING USERS FROM DATABASE SUCCESS");
        res.json(users);
    });
});

//Find users by status
app.get("/users/status/:statusID",function (req,res) {
    var status=req.params.statusID;
    console.log("[ROUTE CALLED][GET] /users/" + status);
    users.find({Status:status},function (error,users) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC USERS FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC USERS FROM DATABASE SUCCESS");
        res.json(users);
    });
});

//Update users(Disable or Reject an user)
app.put("/users/:username",function (req,res) {
    var user = req.params.username;
    console.log("[ROUTE CALLED][PUT] /users/" + user);
    users.findOne({User:user}, function (error,users) {
        if(error){
            res.status(500);
            res.end();
        }
        users.Status = req.body.Status;
        users.save(function (error,users) {
            if(error){
                res.status(500).end();
            }
            res.json(users);
        });
    });
});

//Update user accounts(Approve user accounts)
app.put("/accounts/:accountname",function (req,res) {
    var account = req.params.accountname;
    console.log("[ROUTE CALLED][PUT] /accounts/" + account);
    users.findOne({User:account}, function (error,users) {
        if(error){
            res.status(500);
            res.end();
        }
        users.Status = req.body.Status;
        users.Likes = req.body.Likes;
        users.Dislikes = req.body.Dislikes;
        users.save(function (error,users) {
            if(error){
                res.status(500).end();
            }
            res.json(users);
        });
    });
});

//Find responses by status
app.get("/responses/status/:statusID",function (req,res) {
    var status=req.params.statusID;
    console.log("[ROUTE CALLED][GET] /responses/" + status);
    responses.find({Status:status},function (error,responses) {
        if(error){
            console.log("[ERROR] FETCHING SPECIFIC RESPONSES FROM DATABASE FAILED");
            res.end();
        }
        console.log("[DB] FETCHING SPECIFIC RESPONSES FROM DATABASE SUCCESS");
        res.json(responses);
    });
});

//Update responses(Add as success story)
app.put("/responses/:successstory",function (req,res) {
    var response = req.params.successstory;
    console.log("[ROUTE CALLED][PUT] /responses/" + response);
    responses.findOne({User:response}, function (error,responses) {
        if(error){
            res.status(500);
            res.end();
        }
        responses.Status = req.body.Status;
        responses.save(function (error,responses) {
            if(error){
                res.status(500).end();
            }
            res.json(responses);
        });
    });
});

//Delete an user query/response
app.delete("/responses/:id",function (req,res) {

    var delId = req.params.id;

    console.log("[ROUTE CALLED][DELETE] /responses/" + delId);
    responses.deleteOne({User:delId},function (error,responses) {
        if(error){
            console.log("[ERROR] DELETING ONE RESPONSE FAILED");
            res.end();
        }
        console.log("[DB] DELETING ONE RESPONSE SUCCESS");
        res.json(contents);
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






