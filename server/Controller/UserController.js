const { response } = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Model/UserModel");

const userController = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(req.body.password);

      let saveData = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
      };
      console.log(saveData);

      if (!req.body.email || !req.body.password) {
        return res.status(404).send("Please give email and password");
      }

      await userModel.create(saveData);
      return res.status(200).send("User Registered Sucessfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send("User not found");
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(404).send("Invalid Password");
      }
      return res.status(200).send("User Login Successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      let updateUser = await userModel.findByIdAndUpdate(
        userId,
        {
          fullname: req.body.fullname,
          email: req.body.email,
          mobile: req.body.mobile,
          password: hashPassword,
        },
        {
          new: true,
        }
      );
      if (!updateUser) {
        return res.status(404).send("user not found");
      }
      return res.status(200).send("user updated successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).send("internal server error");
    }
  },
};

module.exports = userController;

//  const response = await fetch(`/api/updateUser/${user._id}`, {
