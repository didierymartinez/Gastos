import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import firebaseConfig from "./firebaseConfig";
import "firebase/firestore";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore
} from "reactfire";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<p>Cargando...</p>}>
      <App />
    </Suspense>
  </FirebaseAppProvider>,
  rootElement
);
