const express = require("express");
const parser = require("body-parser");
const app = express();
const fs = require("fs");
const xml = require("xml");
const bannerCreatives = require("./banner/assets/assets.js");
const nativeCreatives = require("./native/assets/assets.js");
const videoCreatives = require("./native/assets/assets.js");

app.use(parser.json());

// status page
app.get("/", function(reuest, response) {
    response.setHeader("Content-Type", "application/json");
    return response.json({
        "status": true,
        "message": "success"
    });
});

// prebid page
app.get("/prebid", function(request, response){
    fs.readFile("./prebid-site.html", function(err, html){
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
    });
});

// banner endpoint
app.post("/banner", function(request, response){
    let data = request.body;
    console.log('Banner Request Received: ', JSON.stringify(data));

    var randomNum = Math.floor(Math.random() * Math.floor(3));
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Connection', 'keep-alive');
    return response.json(
        {
            "id": data.id,
            "cur": "USD",
            "seatbid": [
                {
                    "seat": "23",
                    "bid": [
                        {
                            "id": "1",
                            "impid": "1",
                            "price": 20,
                            "crid": "dnkftmtr", 
                            "adm": bannerCreatives.creatives[randomNum],
                            "adomain": [
                                "apple.com"
                            ]
                        }
                    ]
                }
            ] 
        }
    );
});

// native endpoint
app.post("/native", function(request, response) {
    let data = request.body;
    console.log('Native Request Received: ', JSON.stringify(data));

    var randomNum = Math.floor(Math.random() * Math.floor(2));
    return response.json(
        {
            "id": data.id,
            "cur": "USD",
            "seatbid": [
                {
                    "seat": "23",
                    "bid": [
                        {
                            "id": "1",
                            "impid": "1",
                            "price": 20,
                            "crid": "bc-bidtellect-test.4", 
                            "nurl": "https://google.com",
                            "adm": nativeCreatives.creatives[randomNum],
                            "adomain": [
                                "apple.com"
                            ]
                        }
                    ]
                }
            ] 
        }
    );
});

// instream video endpoint
app.post("/instream", function(request, response) {
    let data = request.body;
    console.log('Instream Req. Received: ', JSON.stringify(data));
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Connection', 'keep-alive');

    var randomNum = Math.floor(Math.random() * Math.floor(3));
    return response.json(
        {
            "id": data.id,
            "cur": "USD",
            "seatbid": [
                {
                    "seat": "23",
                    "bid": [
                        {
                            "id": "1",
                            "impid": "1",
                            "price": 10.00,
                            "crid": "dnkftmtr", 
                            "adm": videoCreatives.creatives[randomNum],
                            "adomain": [
                                "apple.com"
                            ]
                        }
                    ]
                }
            ] 
        }
    );
});

const server = app.listen(process.env.APP_PORT || 3000);
server.on('connection', function(socket){
   console.log("A new connection was made");
   socket.setTimeout(30 * 1000); //30 sec timeout
   socket.setKeepAlive(true, 5000);
});

server.on('error', (e) => {
   console.log('ERROR: ', e);
});

console.log("listening");
