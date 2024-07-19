const express = require("express");
const AppRouter = express.Router();
const userController = require("../Controller/UserController");

AppRouter.post("/register", userController.register);
AppRouter.post("/login", userController.login);
AppRouter.get("/getAllUser", userController.getAllUsers);
AppRouter.put("/updateUser/:userId", userController.updateUser);
module.exports = AppRouter;
