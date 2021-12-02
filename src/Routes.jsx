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
import AddFamilyMember from "./user/AddFamilyMember";
import MedicalStaffRoute from "./auth/MedicalStaffRoute";
import MedicalStaffDashboard from "./staff/MedicalStaffDashboard";
import AddVaccination from "./staff/AddVaccinationSchedule";
import UpdateProfile from "./user/UpdateProfile";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Centers from "./core/Centers";
import Center from "./core/Center";
import Vaccination from "./core/SingleVaccinationSchedule";
import UpdateVaccinationSchedule from "./staff/UpdateVaccinationSchedule";
import MedicalCenterRoute from "./auth/MedicalCenterRoute";
import VaccineManagement from "./center/VaccineManagement";
import AddVaccine from "./center/AddVaccine";
import UpdateVaccine from "./center/UpdateVaccine";

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
        <MedicalCenterRoute
          path="/vaccines/:userId"
          exact
          component={VaccineManagement}
        />
        <MedicalCenterRoute
          path="/create/vaccine"
          exact
          component={AddVaccine}
        />
        <MedicalCenterRoute
          path="/vaccines/:vaccineId/:userId"
          exact
          component={UpdateVaccine}
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
          component={UpdateVaccinationSchedule}
        />
        <Route path="/centers/:centerId" exact component={Center} />
        <PrivateRoute
          path="/vaccinations/:vaccinationId"
          exact
          component={Vaccination}
        />
        <PrivateRoute
          path="/create/family-member"
          exact
          component={AddFamilyMember}
        />
      </Switch>
    </BrowserRouter>
  );
}
