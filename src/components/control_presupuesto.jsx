import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ControlPresupuesto({
  presupuesto,
  gastos,
  setGasto,
  setPresupuesto,
  setIsValidPresupuesto,
}) {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    // console.log(totalGastado);

    const totalDisponible = presupuesto - totalGastado;

    //calculo del porcentaje
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    //console.log(nuevoPorcentaje);

    setDisponible(totalDisponible);

    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetearApp = () => {
    // console.log("reseteando la app");
    const resultado = confirm("Deseas reiniciar el presupuesto y los gastos ");
    if (resultado) {
      // console.log("SI");
      setGasto([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    } else {
      // console.log("No");
    }
  };

  return (
    <div className="contenedor-presupuesto  contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
        ></CircularProgressbar>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" onClick={handleResetearApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}
export default ControlPresupuesto;
