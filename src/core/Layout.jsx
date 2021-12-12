import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
    <div class="container">
      <footer class="py-3 my-4">
        <p class="text-center text-muted border-top pt-2">
          © 2021 Electronic Medical Handbook
        </p>
      </footer>
    </div>
  </div>
);

export default Layout;
