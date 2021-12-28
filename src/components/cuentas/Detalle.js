import React, { useState, useEffect } from "react";
import { Money } from "../../Funciones";

import { useParams } from "react-router-dom";
import { useFirestore } from "reactfire";
import "firebase/firestore";

const Detalle = () => {
  let { id } = useParams();

  const [_cuenta, setCuenta] = useState([]);

  const date = new Date();
  const db = useFirestore().collection(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/Cuentas`
  );

  const fetchCuentas = async () => {
    const response = db.doc(id);
    response.get().then((x) => setCuenta(x.data()));
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  return (
    <div className="DetalleCuenta">
      {/* <i class="bi bi-arrow-left"></i>Atras */}
      <div className="cuentas detalleC">
        <div>{_cuenta.Descripcion}</div>
        <div className="saldodetallecuenta">{Money(_cuenta.Saldo)}</div>
        <div className="accionescuenta">
          {_cuenta.Transacciones && (
            <div className="button">
              <i className="bi bi bi-file-earmark-diff"></i> Transacciones
            </div>
          )}
          {_cuenta.Pagos && (
            <div className="button">
              <i className="bi bi-ui-checks"></i> Pagos
            </div>
          )}
          {_cuenta.Compras && (
            <div className="button">
              <i className="bi bi-basket2-fill"></i> Compras
            </div>
          )}
        </div>
      </div>
      <table className="cuentas tabla-detalle-cuenta" cellSpacing="0">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Detalle</th>
            <th>Debito</th>
            <th>Credito</th>
          </tr>
        </thead>
        <tbody>
          {_cuenta?.Movimientos?.map((x, i) => (
            <tr key={i}>
              <td className="fechaMovimiento">
                {" "}
                {x.Fecha.toDate()
                  .toLocaleString("es-co", { hour12: true })
                  .replace(/\sm/, "m")
                  .replace(/:\d{2}\s/, " ")}
              </td>
              <td> {x.Descripcion}</td>
              <td> {x.Debito}</td>
              <td> {x.Credito}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Detalle;
