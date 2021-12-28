import React, { useState } from "react";
import { Money } from "../../Funciones";
import { useFirestore } from "reactfire";
import firebase from "firebase/app";

const Transaccion = ({ datosTransaccion, tipo }) => {
  const date = new Date();
  const [valor, setValor] = useState(datosTransaccion.Valor);

  const handleChangeValue = (event) => {
    setValor(event.target.value);
    //console.log(event.target.value);
    //event.target.value = Money(event.ta1rget.value);
  };

  const bd = useFirestore().collection(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/Cuentas`
  );

  const cuentaCred = bd.doc(`/${datosTransaccion.CuentaCredito}`);
  const cuentaDeb = bd.doc(`/${datosTransaccion.CuentaDebito}`);

  const transaccion = useFirestore().doc(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/${tipo}/${
      datosTransaccion.Descripcion
    }`
  );

  let mov = {
    Fecha: new Date(),
    Descripcion: datosTransaccion.Descripcion
  };

  const Pagar = () => {
    const increment = firebase.firestore.FieldValue.increment;
    if (!!datosTransaccion.CuentaCredito) {
      mov.Credito = valor;
      mov.Debito = 0;
      cuentaCred.update({
        Saldo: increment(valor),
        Movimientos: firebase.firestore.FieldValue.arrayUnion(mov)
      });
    }
    if (!!datosTransaccion.CuentaDebito) {
      mov.Credito = 0;
      mov.Debito = valor;
      cuentaDeb.update({
        Saldo: increment(-valor),
        Movimientos: firebase.firestore.FieldValue.arrayUnion(mov)
      });
    }

    transaccion.update({ Procesada: true });
  };

  return (
    <div className="transaccion">
      <div className="Encabezado">
        <div>{datosTransaccion.Descripcion}</div>
        <div className="transacion-control">
          <span className="dia">Día: {datosTransaccion.DiaLimite}</span>
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <div className="Detalle">
        {datosTransaccion.ValorVariable ? (
          <div className="valor">
            <input
              type="text"
              defaultValue={datosTransaccion.Valor}
              onChange={handleChangeValue}
            />
          </div>
        ) : (
          <div className="valor">{Money(datosTransaccion.Valor)}</div>
        )}
        <div>
          <i className="bi bi-check2-circle" onClick={Pagar}></i>
        </div>
      </div>
    </div>
  );
};

export default Transaccion;
