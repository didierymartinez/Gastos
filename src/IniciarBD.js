export default function iniciarBD(db) {
  const crearCuentas = function (cuentas) {
    cuentas.forEach((cuenta) => {
      db.collection("Cuentas")
        .doc(cuenta.Nombre)
        .set({
          Descripcion: cuenta.Nombre,
          Movimientos: [],
          Saldo: cuenta?.Saldo || 0,
          SaldoInicial: cuenta?.Saldo || 0,
          Visible: cuenta.Visible,
          Transacciones: cuenta.Transacciones || false,
          Pagos: cuenta.Pagos || false,
          Compras: cuenta.Compras || false
        });
    });
  };

  const crearTransacciones = function (tipo, transacciones) {
    transacciones.forEach((transaccion) => {
      transaccion.Procesada = false;
      db.collection(tipo).doc(transaccion.Descripcion).set(transaccion);
    });
  };

  crearCuentas([
    {
      Nombre: "AvVillas",
      Saldo: 5555,
      Visible: true,
      Transacciones: true,
      Pagos: false,
      Compras: true
    },
    {
      Nombre: "Efectivo",
      Saldo: 0,
      Visible: true,
      Transacciones: true,
      Pagos: false,
      Compras: true
    },
    {
      Nombre: "Colpatria",
      Visible: false,
      Transacciones: false,
      Pagos: true,
      Compras: true
    },
    {
      Nombre: "Visa",
      Visible: false,
      Transacciones: false,
      Pagos: true,
      Compras: true
    },
    {
      Nombre: "Master",
      Visible: true,
      Transacciones: false,
      Pagos: true,
      Compras: true
    },
    {
      Nombre: "Jumbo",
      Visible: true,
      Transacciones: false,
      Pagos: true,
      Compras: true
    },
    { Nombre: "Rappi", Visible: false },
    { Nombre: "Stem", Visible: false },
    { Nombre: "Inversion", Visible: false },
    { Nombre: "Prestamos", Saldo: 20000, Visible: false }
  ]);

  crearTransacciones("Deudas", [
    {
      Descripcion: "STEM",
      DiaLimite: 5,
      CuentaDebito: "AvVillas",
      CuentaCredito: "Stem",
      Valor: 50000
    },
    {
      Descripcion: "Apto Colina",
      DiaLimite: 5,
      CuentaDebito: "AvVillas",
      Valor: 1500000
    },
    {
      Descripcion: "Apto Centro",
      DiaLimite: 30,
      CuentaDebito: "AvVillas",
      Valor: 715000
    },
    {
      Descripcion: "Crédito N204",
      DiaLimite: 23,
      CuentaDebito: "AvVillas",
      Valor: 1330000
    }
  ]);

  crearTransacciones("Ingresos", [
    {
      Descripcion: "Sueldo Primera Q",
      DiaLimite: 15,
      CuentaCredito: "AvVillas",
      Valor: 1000000
    },
    {
      Descripcion: "Sueldo Segunda Q",
      DiaLimite: 30,
      CuentaCredito: "AvVillas",
      Valor: 2611688
    },
    {
      Descripcion: "Arriendo",
      DiaLimite: 5,
      CuentaCredito: "AvVillas",
      Valor: 950000
    }
  ]);

  crearTransacciones("Servicios", [
    {
      Descripcion: "Gas",
      DiaLimite: 23,
      CuentaDebito: "AvVillas",
      ValorVariable: true,
      Valor: 60000
    },
    {
      Descripcion: "Agua",
      DiaLimite: 18,
      CuentaDebito: "AvVillas",
      ValorVariable: true,
      Valor: 100000
    },
    {
      Descripcion: "Luz",
      DiaLimite: 20,
      CuentaDebito: "AvVillas",
      ValorVariable: true,
      Valor: 100000
    },
    {
      Descripcion: "Claro",
      DiaLimite: 15,
      CuentaDebito: "AvVillas",
      ValorVariable: true,
      Valor: 133200
    }
  ]);

  crearTransacciones("Recurrente", [
    {
      Descripcion: "Compra MASTER",
      CuentaDebito: "Master",
      ValorVariable: true,
      Valor: 200000
    },
    {
      Descripcion: "Compra JUMBO",
      CuentaDebito: "Jumbo",
      ValorVariable: true,
      Valor: 200000
    },
    {
      Descripcion: "Retiro",
      CuentaDebito: "AvVillas",
      CuentaCredito: "Efectivo",
      ValorVariable: true,
      Valor: 200000
    },
    {
      Descripcion: "Recarga Celular",
      CuentaDebito: "AvVillas",
      ValorVariable: true,
      Valor: 5000
    }
  ]);
}
