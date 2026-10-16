const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  const page = parsedUrl.pathname;

  const params = Object.fromEntries(parsedUrl.searchParams.entries());

  console.log(page);

  if (page === "/") {
    fs.readFile(path.join(__dirname, "../api.html"), function (err, data) {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("Something went wrong.");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page === "/api") {
    if ("choice" in params) {
      const playerChoice = params["choice"];

      const randomNumber = Math.random();

      let coinResult;

      if (randomNumber < 0.5) {
        coinResult = "heads";
      } else {
        coinResult = "tails";
      }

      let message;
      if (playerChoice === coinResult) {
        message = "You win!";
      } else {
        message = "You lose!";
      }

      const responseObject = {
        playerChoice: playerChoice,
        coinResult: coinResult,
        message: message,
      };
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(responseObject));
    } else {
      const responseObject = {
        error: "Please choose heads or tails.",
      };

      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(responseObject));
    }
  } else if (page === "/main.css") {
    fs.readFile(path.join(__dirname, "../main.css"), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/css",
      });

      res.write(data);
      res.end();
    });
  } else if (page === "/js/main.js") {
    fs.readFile(path.join(__dirname, "../js/main.js"), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/javascript",
      });

      res.end(data);
    });
  } else if (page === "/images/v1008-21-b.jpg") {
    fs.readFile(
      path.join(__dirname, "../images/v1008-21-b.jpg"),
      function (err, data) {
        if (err) {
          console.log("Image error:", err);

          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200, {
          "Content-Type": "image/jpeg",
        });
        res.end(data);
      },
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("404 - Page Not Found");
  }
});

server.listen(8000, function () {
  console.log("Server running on http://localhost:8000");
});
