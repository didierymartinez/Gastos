import { useFirestore } from "reactfire";
import React, { useState, useEffect } from "react";

import Transacciones from "./Transacciones";

export default () => {
  const [blogs, setBlogs] = useState([]);
  const db = useFirestore().doc("Didier/Balance/2021/6/");

  const fetchBlogs = async () => {
    const response = db.collection("Ingresos");
    const data = await response.get();

    const info = data.docs.map((item) => item.data());

    setBlogs(info);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <Transacciones transacciones={blogs} />;
    </div>
  );
};
