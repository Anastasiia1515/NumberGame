const http = require("http")

let userGuesses = []
const requestListener = function (req, res) {
  if(req.url !== "/game") {
    res.writeHead(404)
    res.end()
    return
  }
 
  if (req.method === "GET") {
    res.writeHead(202, {"Access-Control-Allow-Origin": "*"})
    res.end(JSON.stringify({userGuesses: userGuesses}))
  } else if (req.method === "POST") {
    let data = ""
    req.on("data", chunk => {
      data += chunk;
    })
    req.on("end", () => {
      console.log(JSON.parse(data).userGuess);
      res.writeHead(202, {"Access-Control-Allow-Origin": "*"})
      userGuesses.push(JSON.parse(data).userGuess)
      res.end()
    })
  } else {
    res.writeHead(405)
    res.end()
  }
  
}

const server = http.createServer(requestListener)
server.listen(8081)
