import React from "react";
import iniciarBD from "../IniciarBD";
import { useFirestore } from "reactfire";
import { Link } from "react-router-dom";

const Nav = () => {
  const date = new Date();

  const db = useFirestore().doc(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/`
  );

  const reiniciar = () => {
    iniciarBD(db);
  };

  return (
    <div className="bar navegacion">
      <div>
        <Link to="/">
          <i
            className="bi bi-house-door active"
            role="img"
            aria-label="House"
          ></i>
        </Link>
      </div>
      <div>
        <i className="bi bi-x-diamond-fill" onClick={reiniciar}></i>
      </div>
      <div>
        <i className="bi bi-card-list" role="img" aria-label="GitHub"></i>
      </div>
      <div>
        <i className="bi bi-cash" role="img" aria-label="GitHub"></i>
      </div>
    </div>
  );
};

export default Nav;
