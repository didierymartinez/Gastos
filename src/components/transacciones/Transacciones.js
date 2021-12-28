import React from "react";
import Transaccion from "./Transaccion";
import SwipeToDelete from "react-swipe-to-delete-component";
import { useFirestore } from "reactfire";
import firebase from "firebase/app";

const Transacciones = ({ transacciones, tipo }) => {
  const date = new Date();
  const transaccion = useFirestore().collection(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/${tipo}`
  );

  const deleted = (trans) => {
    transaccion.doc(`/${trans}`).update({ Procesada: true });
  };
  return (
    <div>
      {transacciones
        .sort((a, b) => a.DiaLimite - b.DiaLimite)
        .map((transaccion, i) => (
          <SwipeToDelete
            deleteSwipe={0.3}
            onDelete={() => {
              deleted(transaccion.Descripcion);
            }}
            key={i}
          >
            <Transaccion key={i} datosTransaccion={transaccion} tipo={tipo} />
          </SwipeToDelete>
        ))}
    </div>
  );
};

export default Transacciones;
