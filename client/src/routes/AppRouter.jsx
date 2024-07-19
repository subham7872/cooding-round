import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserUpdate from "../pages/UserUpdate";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userUpdate" element={<UserUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
