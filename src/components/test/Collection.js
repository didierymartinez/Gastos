import React, { useEffect } from "react";

import { useFirestore, useFirestoreDocData } from "reactfire";
import "firebase/firestore";

export default function App() {
  useEffect(() => {}, []);

  const serviciosRef = useFirestore().collection("Balance").doc("Cuentas");
  const { status: statusServicios, data: dataServicios } = useFirestoreDocData(
    serviciosRef
  );

  if (statusServicios === "loading") {
    return <p>Cargando...</p>;
  }

  const cleanData = (col) => {
    console.log(col);
  };

  return <div>{cleanData(dataServicios)}</div>;
}
