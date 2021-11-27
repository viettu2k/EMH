import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import MedicalCenterDashboard from "./center/MedicalCenterDashboard";
import UserDashboard from "./user/UserDashboard";
import AddCenter from "./admin/AddCenter";
import AddMedicalStaff from "./center/AddMedicalStaff";
import MedicalStaffRoute from "./auth/MedicalStaffRoute";
import MedicalStaffDashboard from "./staff/MedicalStaffDashboard";
import AddVaccination from "./staff/AddVaccination";
import UpdateProfile from "./user/UpdateProfile";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Centers from "./core/Centers";
import Center from "./core/Center";
import Vaccination from "./core/Vaccination";
import EditVaccination from "./core/EditVaccination";
import EditCenter from "./core/EditCenter";
import MedicalCenterRoute from "./auth/MedicalCenterRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        <Route exact path="/centers" component={Centers} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/profile/:userId" exact component={UpdateProfile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/center" exact component={AddCenter} />
        <MedicalCenterRoute
          path="/center/dashboard"
          exact
          component={MedicalCenterDashboard}
        />
        <MedicalCenterRoute
          path="/create/staff"
          exact
          component={AddMedicalStaff}
        />
        <AdminRoute
          path="/update/center/:centerId"
          exact
          component={EditCenter}
        />
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
        <MedicalStaffRoute
          path="/update/vaccination/:vaccinationId"
          exact
          component={EditVaccination}
        />
        <Route path="/centers/:centerId" exact component={Center} />
        <Route
          path="/vaccinations/:vaccinationId"
          exact
          component={Vaccination}
        />
      </Switch>
    </BrowserRouter>
  );
}
