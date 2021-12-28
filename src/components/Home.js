import React, { useState, useEffect } from "react";

import Nav from "./Nav";
import Cuentas from "./cuentas/Cuentas";
import Transacciones from "./transacciones/Transacciones";

import { useFirestore } from "reactfire";
import "firebase/firestore";

export default function Home() {
  const date = new Date();
  const dia = date.getDate();
  const mes = date.toLocaleString("default", { month: "long" });

  const [ingresos, setIngresos] = useState([]);
  const [deudas, setDeudas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [recurrente, setRecurrente] = useState([]);

  const db = useFirestore().doc(
    `Didier/Balance/${date.getFullYear()}/${date.getMonth() + 1}/`
  );

  const fetchTransacciones = async () => {
    const dataIngresos = await db
      .collection("Ingresos")
      .where("Procesada", "==", false)
      .get();

    setIngresos(dataIngresos.docs.map((item) => item.data()));

    db.collection("Ingresos")
      .where("Procesada", "==", false)
      .onSnapshot((e) => {
        let inf = [];
        e.forEach((x) => inf.push(x.data()));
        setIngresos(inf);
      });

    const dataDeudas = await db
      .collection("Deudas")
      .where("Procesada", "==", false)
      .get();

    setDeudas(dataDeudas.docs.map((item) => item.data()));

    db.collection("Deudas")
      .where("Procesada", "==", false)
      .onSnapshot((e) => {
        let inf = [];
        e.forEach((x) => inf.push(x.data()));
        setDeudas(inf);
      });

    const dataServicios = await db
      .collection("Servicios")
      .where("Procesada", "==", false)
      .get();
    setServicios(dataServicios.docs.map((item) => item.data()));

    db.collection("Servicios")
      .where("Procesada", "==", false)
      .onSnapshot((e) => {
        let inf = [];
        e.forEach((x) => inf.push(x.data()));
        setServicios(inf);
      });

    const dataRecurrente = await db
      .collection("Recurrente")
      .where("Procesada", "==", false)
      .get();
    setRecurrente(dataRecurrente.docs.map((item) => item.data()));
  };

  useEffect(() => {
    fetchTransacciones();
  }, []);

  return (
    <div className="App">
      <h1>
        {dia} de {mes} 2021
      </h1>
      <section className="main">
        <Cuentas />
        <h2 style={{ color: "#219653" }}>Ingresos</h2>
        <Transacciones transacciones={ingresos} tipo="Ingresos" />
        <h2 style={{ color: "#EB5757" }}>Deudas</h2>
        <Transacciones transacciones={deudas} tipo="Deudas" />
        <h2 style={{ color: "#EB5757" }}>Servicios</h2>
        <Transacciones transacciones={servicios} tipo="Servicios" />
        <h2 style={{ color: "#EB5757" }}>Recurrente</h2>
        <Transacciones transacciones={recurrente} tipo="Recurrente" />
      </section>
      <Nav />
    </div>
  );
}
