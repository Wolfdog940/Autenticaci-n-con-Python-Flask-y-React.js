import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [valores, setValores] = useState({});

  const handleInputChange = (event) => {
    setValores({
      ...valores,
      [event.target.type]: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(valores);
    logear();
  }
  function logear() {
    fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      console.log(resp.ok);
      console.log(resp.status);

      return resp.json();
    });
  }
  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo electrónico
          </label>
          <input
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
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Login;
