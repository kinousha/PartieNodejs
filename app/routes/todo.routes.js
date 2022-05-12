module.exports = app => {
  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Todo
  router.post("/",verifyToken, todos.create);

  // Retrieve all todos
  router.get("/",verifyToken, todos.findAll);

  // Retrieve a single Todo with id
  router.get("/:id",verifyToken, todos.findOne);

  // Update a Todo with id
  router.put("/:id",verifyToken, todos.update);

  // Delete a Todo with id
  router.delete("/:id",verifyToken, todos.delete);
  app.use("/api/todos", router);
  function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
};
