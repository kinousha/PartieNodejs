module.exports = app => {
  const todos = require("../controllers/todo.controller.js");
  const config = require("../config/auth.config.js");

  const jwt = require('jsonwebtoken');

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
  function verifyToken (req, res, next) {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUyMzQxNDgyLCJleHAiOjE2NTI0Mjc4ODJ9.EnKt2ii_H9T0_f7-a71GhYCdW-6ZOw5rrZ5R3utGbMQ";
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  }
};
