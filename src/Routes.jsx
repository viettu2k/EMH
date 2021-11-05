import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import MedicalStaffRoute from "./auth/MedicalStaffRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCenter from "./admin/AddCenter";
import MedicalStaffDashboard from "./user/MedicalStaffDashboard";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/center" exact component={AddCenter} />
        <MedicalStaffRoute
          path="/staff/dashboard"
          exact
          component={MedicalStaffDashboard}
        />
      </Switch>
    </BrowserRouter>
  );
}
