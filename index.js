const http = require("http");
const port = 8081; // http://localhost:8081

let todolist = ["Add Routes to the node.js project", "Add request methods"];

http
  .createServer((request, response) => {
    const { url, method } = request;

    if (url == "/todos") {
      if (method === "GET") {
        response.writeHead(200);
        response.write(todolist.toString());
      } else if (method === "POST") {
        let body = "";

        request
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body = chunk + body;
          })
          .on("end", () => {
            body = JSON.parse(body);
            let newTodo = body.name;
            todolist.push(newTodo);

            response.writeHead(201);
          });
      } else if (method === "DELETE") {
        let body = "";
        request
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body = body + chunk;
          })
          .on("end", () => {
            body = JSON.parse(body);
            let deleteTodo = body.name;
            for (let i = 0; i < todolist.length; i++) {
              if (todolist[i] === deleteTodo) {
                todolist.splice(i, 1);
              }
            }
            response.writeHead(204);
          });
      } else {
        response.writeHead(501);
      }
    } else {
      response.writeHead(404);
    }

    response.end();
  })
  .listen(port, () => {
    console.log(`Node.js server running on port ${port}`);
  });
