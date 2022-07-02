const http = require("http");
const fs = require("fs");

const host = "127.0.0.1";
const port = 3000;

const htmlFile = process.argv[2];
const dataFile = process.argv[3];

const server = http.createServer((req, res) => {
  try {
    const data = fs.readFileSync(dataFile);

    const citiesList = JSON.parse(data);

    fs.readFile(htmlFile, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);

      for (let city of citiesList) {
        res.write(`<h4 class="listItem">${city.name}</h4>`);
      }

      return res.end();
    });
  } catch (err) {
    console.error(err);
    res.writeHead(404, { "Content-Type": "text/html" });
    return res.end("404 Not Found");
  }
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
