const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
const User = db.users;
const Role = db.roles;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initialRole();
  initialUser();
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kine application." });
});
require("./app/routes/todo.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
function initialRole() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
function initialUser() {
  User.create({
    
    username: "user",
    email:"kinousha@gmail.com",
    password:"pass"

  });
 
  User.create({
    
    username: "Anta",
    email:"Anta@gmail.com",
    password:"pass"
  });
 
  User.create({

    username: "khady",
    email:"khady@gmail.com",
    password:"pass"
  });
}