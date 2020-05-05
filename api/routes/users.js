module.exports = app => {
    const users = require("../controllers/users-controller");

    var router = require("express").Router();

    // Register a new User
    router.post("/register", users.registerUser);

    // Login a User
    router.post("/login", users.loginUser);

    // Get all Users
    router.get("/", users.getUsers);

    app.use('/api/users', router);
};