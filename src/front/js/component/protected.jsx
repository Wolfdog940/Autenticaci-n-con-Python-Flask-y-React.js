import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Protected = () => {
  const [proteger, setProteger] = useState({});
  const { store, actions } = useContext(Context);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.token,
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        if (data.id) {
          setProteger(data);
        }
      });
  }, []);

  return (
    <div>
      <h1>{proteger.email}</h1>
      <h1>{proteger.id}</h1>
    </div>
  );
};

export default Protected;
//crear fech para redigirme a mi protecter
