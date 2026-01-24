import React from "react";
import { BrowserRouter,Navigate,Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./pages/layouts/Layout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const AuthGuard = () =>{
return token? <Outlet /> : <Navigate to ={"/login"}/>;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route element={<AuthGuard/>}/>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;