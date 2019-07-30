const express = require("express");
const parser = require("body-parser");
const app = express();
const fs = require("fs");

app.use(parser.json());

app.get("/", function(request, response){
    fs.readFile("../../test.html", function(err, html){
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();
    });
});

app.post("/bid-request", function(request, response){
    let data = request.body;
    console.log('Req. Received: ', JSON.stringify(data));

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
                            "adm": "<img src=\"https://eur-ukp.adsrvr.org/bid/feedback/triplelift?iid=3dc3eb2f-18a6-4548-9590-f752e0a4e074&crid=byo07y09&wp=${AUCTION_PRICE}&aid=1&wpc=USD&sfe=eef0356&puid=&tdid=&pid=zaiyh87&ag=d5ysgk9&sig=s-TrAbSNeiHRKhzo3w-rTH2MdqDoN1lLI7t3qGPIr4s.&cf=831469&fq=0&td_s=com.wallapop&rcats=&mcat=&mste=&mfld=4&mssi=None&mfsi=ql3b2m8ipd&uhow=93&agsa=&rgco=Spain&rgre=Tarragona&rgme=&rgci=Calafell&rgz=43820&svbttd=1&dt=Mobile&osf=Android&os=Android70&br=WebView&rlangs=01&mlang=&svpid=5730&did=&rcxt=InApp&lat=41.199081&lon=1.627507&tmpc=14.32&daid=b6b5cad9-776a-43ab-bc02-2ec26b5a4df4&vp=0&osi=&osv=&bp=2.82132015212558&mk=Samsung&mdl=SM-G925F&c=OAA.&dur=CiYKBzkyMm5zM3AQoSMiCwjKnYBtEgRub25lIgsIwZ-tcxIEbm9uZQo2Ch1jaGFyZ2UtYWxsSW50ZWdyYWxCcmFuZFNhZmV0eSIVCPn__________wESCGludGVncmFsEKEj&crrelr=&adpt=tl_ltriplelift&ipl=hd_21492&grdc=CAEYASABKAE.&ict=Unknown\" width=\"1\" height=\"1\" style=\"display: none;\"/><ins class='dcmads' style='display:inline-block;width:300px;height:250px'\r\n    data-dcm-placement='N854189.284566THETRADEDESK/B22541940.244692800'\r\n    data-dcm-rendering-mode='script'\r\n    data-dcm-https-only\r\n    data-dcm-resettable-device-id=''\r\n    data-dcm-app-id='' data-dcm-click-tracker='https://insight.adsrvr.org/track/clk?imp=3dc3eb2f-18a6-4548-9590-f752e0a4e074&ag=d5ysgk9&sfe=eef0356&sig=s-TrAbSNeiHRKhzo3w-rTH2MdqDoN1lLI7t3qGPIr4s.&crid=byo07y09&cf=831469&fq=0&td_s=com.wallapop&rcats=&mcat=&mste=&mfld=4&mssi=None&mfsi=ql3b2m8ipd&sv=triplelift&uhow=93&agsa=&rgco=Spain&rgre=Tarragona&rgme=&rgci=Calafell&rgz=43820&dt=Mobile&osf=Android&os=Android70&br=WebView&svpid=5730&rlangs=01&mlang=&did=&rcxt=InApp&tmpc=14.32&vrtd=&osi=&osv=&daid=b6b5cad9-776a-43ab-bc02-2ec26b5a4df4&dnr=0&vpb=&c=OAA.&dur=CiYKBzkyMm5zM3AQoSMiCwjKnYBtEgRub25lIgsIwZ-tcxIEbm9uZQo2Ch1jaGFyZ2UtYWxsSW50ZWdyYWxCcmFuZFNhZmV0eSIVCPn__________wESCGludGVncmFsEKEj&crrelr=&npt=&svscid=mobile-app&mk=Samsung&mdl=SM-G925F&adpt=tl_ltriplelift&ipl=hd_21492&ict=Unknown&grdc=CAEYASABKAE.&r='>\r\n  <script src='https://www.googletagservices.com/dcm/dcmads.js'></script>\r\n</ins><span id=\"te-clearads-js-tradedesk01cont1\"><script type=\"text/javascript\" src=\"https://choices.truste.com/ca?pid=tradedesk01&aid=tradedesk01&cid=r4qky4e_d5ysgk9_byo07y09&c=tradedesk01cont1&js=pmw0&w=300&h=250&sid=ev9-FM60pzWefkMAiM77ugE-aNy2u3kzAYRYrOVH6CD57fK508bgd5YpoSnhkRfojfvgoyONCr4NH_s1ctCqDHXx-9-2x5qfIq1ztneWaT22LrfHY_mjz2cl7BKbJtkV\"></script></span>",
                            "adomain": [
                                "apple.com"
                            ]
                        }
                    ]
                }
            ],
          
    });
});

const server = app.listen(8000);
server.on('connection', function(socket){
   console.log("A new connection was made");
   socket.setTimeout(30 * 1000);
   socket.setKeepAlive(true, 5000);
   //30 sec timeout
});

server.on('error', (e) => {
   console.log('ERROR: ', e);
});

console.log("listening...");
