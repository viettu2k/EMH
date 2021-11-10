import React from "react";
import Layout from "./Layout";
import Vaccinations from "./Vaccinations";

export default function Home() {
  return (
    <Layout
      title="Home Page"
      description="ELECTRONIC MEDICAL HANDBOOK"
      className="container-fluid"
    >
      <Vaccinations />
    </Layout>
  );
}
