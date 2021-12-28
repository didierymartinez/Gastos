import React from "react";
import { Money } from "../../Funciones";
import { useFirestore } from "reactfire";
import { Link } from "react-router-dom";

const Cuenta = ({ nombre, saldo, visible }) => {
  const date = new Date();
  const bd = useFirestore().collection(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/Cuentas`
  );

  const toggleVisible = (cuenta) => {
    const cuentaCred = bd.doc(`/${cuenta}`);
    cuentaCred.update({ Visible: !visible });
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td className="saldo">{Money(saldo)}</td>
      <td className="controles-cuenta">
        {visible ? (
          <i
            onClick={() => {
              toggleVisible(nombre);
            }}
            className="bi bi-pin-fill"
          ></i>
        ) : (
          <i
            onClick={() => {
              toggleVisible(nombre);
            }}
            className="bi bi-pin-angle"
          ></i>
        )}
        <Link to={`/cuentas/${nombre}`}>
          <i
            className="bi bi-box-arrow-in-up-right"
            style={{ color: "#333333" }}
          ></i>
        </Link>
      </td>
    </tr>
  );
};

export default Cuenta;
