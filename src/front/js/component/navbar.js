import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Navbar = () => {
  const { store } = useContext(Context);

  return (
    store.token != null && (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Home</span>
          </Link>
          <div className="ml-auto">
            <Link to="/demo">
              <button className="btn btn-primary">
                Check the Context in action
              </button>
            </Link>
          </div>
        </div>
      </nav>
    )
  );
};
