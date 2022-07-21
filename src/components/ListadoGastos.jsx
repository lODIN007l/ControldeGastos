import React from "react";
import GastoC from "../components/Gasto";

const ListadoGastos = ({ gastos }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Gastos " : "No hay Gastos aun"}</h2>
      {gastos.map((gasto) => (
        <GastoC key={gasto.id} gasto={gasto} />
      ))}
    </div>
  );
};

export default ListadoGastos;
