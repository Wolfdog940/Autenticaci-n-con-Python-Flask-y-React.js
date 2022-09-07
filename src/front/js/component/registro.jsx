import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registro = () => {
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
    register();
  }
  function register() {
    fetch(process.env.BACKEND_URL + "/api/registro", {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
      console.log(resp.status); // el código de estado = 200 o código = 400 etc.

      return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    });
  }

  return (
    <div className="d-flex justify-content-center">
      <p>Registro de Usuario</p>
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
            placeholder="email"
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
            placeholder="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Registro;
