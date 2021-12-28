import React, { useState, useEffect } from "react";
import Cuenta from "./Cuenta";
import { useFirestore } from "reactfire";
import "firebase/firestore";

const Cuentas = ({ cuentas }) => {
  const [_cuentas, setCuentas] = useState([]);
  const [open, setOpen] = useState("down");
  const date = new Date();
  const db = useFirestore().doc(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/`
  );

  const fetchCuentas = async () => {
    const response = db.collection("Cuentas");
    response.onSnapshot((e) => {
      let inf = [];
      e.forEach((x) => inf.push(x.data()));
      setCuentas(inf);
    });
    const data = await response.get();

    const info = data.docs.map((item) => item.data());
    setCuentas(info);
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  const abrir = () => {
    const ope = open === "down" ? "up" : "down";
    setOpen(ope);
  };

  return (
    <>
      <table className="cuentas" cellSpacing="0">
        <thead>
          <tr>
            <th colSpan="3">Cuentas</th>
          </tr>
        </thead>
        <tbody>
          {_cuentas
            .filter((y) => y.Visible)
            .map((x, i) => (
              <Cuenta
                key={i}
                nombre={x.Descripcion}
                saldo={x.Saldo}
                visible={x.Visible}
              />
            ))}
        </tbody>
      </table>
      <table className={`cuentas opener ${open}`} cellSpacing="0">
        <thead>
          <tr onClick={abrir}>
            <th colSpan="3">
              <i className={`bi bi-caret-${open}-square-fill`}></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {_cuentas
            .filter((y) => !y.Visible)
            .map((x, i) => (
              <Cuenta
                key={i}
                nombre={x.Descripcion}
                saldo={x.Saldo}
                visible={x.Visible}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Cuentas;
