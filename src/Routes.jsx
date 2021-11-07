import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCenter from "./admin/AddCenter";
import MedicalStaffRoute from "./auth/MedicalStaffRoute";
import MedicalStaffDashboard from "./user/MedicalStaffDashboard";
import AddVaccination from "./staff/AddVaccination";
import Profile from "./user/Profile";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/center" exact component={AddCenter} />
        <MedicalStaffRoute
          path="/staff/dashboard"
          exact
          component={MedicalStaffDashboard}
        />
        <MedicalStaffRoute
          path="/create/vaccination"
          exact
          component={AddVaccination}
        />
      </Switch>
    </BrowserRouter>
  );
}
