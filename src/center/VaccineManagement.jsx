import React from "react";
import Layout from "../core/Layout";
import Vaccines from "./Vaccines";

export default function VaccineManagement() {
  return (
    <Layout
      title="Vaccine Management Page"
      description="Welcome to the Vaccine Management"
      className="container-fluid"
    >
      <Vaccines />
    </Layout>
  );
}
