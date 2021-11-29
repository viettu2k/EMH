import React from "react";
import Layout from "./Layout";
import ListVaccinationSchedule from "./ListVaccinationSchedule";

export default function Home() {
  return (
    <Layout
      title="Home Page"
      description="ELECTRONIC MEDICAL HANDBOOK"
      className="container-fluid"
    >
      <ListVaccinationSchedule />
    </Layout>
  );
}
