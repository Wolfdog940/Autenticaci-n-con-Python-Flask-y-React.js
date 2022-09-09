import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const [valores, setValores] = useState({});
  const { store, actions } = useContext(Context);

  const handleInputChange = (event) => {
    setValores({
      ...valores,
      [event.target.type]: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    logear();
  }

  function borrar() {
    actions.borrar_token();
    console.log(store.token, "borrado de token");
    sessionStorage.removeItem("token");
  }

  function logear() {
    fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);

        return resp.json();
      })
      .then((resp) => {
        actions.guardar_token(resp.token);
        console.log(store.token);

        return resp;
      });
  }
  return (
    <div className="d-flex justify-content-center">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo electrónico
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            Nunca compartiremos su correo electrónico con nadie más.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleInputChange}
        >
          login
        </button>
        <button onClick={borrar} type="button" className="btn btn-danger">
          logout
        </button>
      </form>
    </div>
  );
};

export default Login;
