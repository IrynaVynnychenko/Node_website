// const htmlDefault = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
// </head>
// <body>

// </body>
// </html>
// `;
// const path = require("path");
const fs = require("fs");
const http = require("http");
const data = require("./cars.json");

var result = "";

for (let i = 0; i < data.carstypes.length; i++) {
  result += `<a href="${data.carstypes[i].model}" target="blank"><div>${
    data.carstypes[i].model
  } ${data.carstypes[i].price}</div></a>`;
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`<h1>Мы продаем машины</h1> ${result}`);
  } 

  for (let i = 0; i < data.carstypes.length; i++) {
      if (req.url === `/${data.carstypes[i].model}`) {
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(`
        <a href="/" style="color: #8a2be2; width: 200px; height: 20px">Вернуться на главную</a>
        <h1>${data.carstypes[i].model}</h1> <img src="${data.carstypes[i].photo}">
        <div>${data.carstypes[i].description}</div><div>${data.carstypes[i].price}</div>`);
      } 
  }
  res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(`<h1>404</h1>`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server succesfully started, listening on 3000 port");
});
