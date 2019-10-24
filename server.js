const http = require("http");
const request = require("request");
require("dotenv").config();

const clientId = "57091af873a54cbc4d71";
const secretKey = "95ac48be7ce1ae15a7a616b0bda3150003e7176f";

console.log("started server on port 5000");

http
  .createServer((req, res) => {
    var code = req.url.split("=")[1];
    if (code) {
      request.post(
        "https://github.com/login/oauth/access_token",
        {
          form: {
            client_id: clientId,
            client_secret: secretKey,
            code: code
          }
        },
        (err, r, body) => {
          console.log("I got a request!");
          res.writeHead(301, {
            Location: "http://localhost:3000/?" + body
          });
          res.end();
        }
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(5000);
