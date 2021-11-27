import React from "react";
import Layout from "../core/Layout";
import Vaccines from "./Vaccines";

export default function VaccineManagement() {
  return (
    <Layout
      title="Vaccine Management Page"
      description="ELECTRONIC MEDICAL HANDBOOK"
      className="container-fluid"
    >
      <Vaccines />
    </Layout>
  );
}
