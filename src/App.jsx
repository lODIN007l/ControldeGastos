import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import FiltroR from "./components/filtros";
import IconoGastoN from "./img/nuevo-gasto.svg";
import { generarID } from "./helpers/index";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGasto] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltro, setGastosFiltro] = useState([]);

  //ediar

  useEffect(() => {
    // console.log("componente list o");
    if (Object.keys(gastoEditar).length > 0) {
      //console.log("tiene algo ");
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
        // console.log("animando modal");
      }, 500);
    }
  }, [gastoEditar]);

  //nuevo

  const handleNuevoGasto = () => {
    setModal(true);
    //vaciamos lo editado
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
      // console.log("animando modal");
    }, 500);
  };

  const guardarGasto = (gasto) => {
    // console.log(gasto);
    if (gasto.id) {
      //actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGasto(gastosActualizados);
      setGastoEditar({});
    } else {
      //nuevo gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGasto([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  //eliminar
  const eliminarGasto = (id) => {
    // console.log("eliminado", id);
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    // console.log(gastosActualizados);
    setGasto(gastosActualizados);
  };
  //guardamos en local Storage
  useEffect(() => {
    // console.log(presupuesto);
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  //guardar los gasto hechos
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);
  //cambios sucedidos en filtro
  useEffect(() => {
    if (filtro) {
      // console.log("filtrando", filtro);
      const gastoFiltrado = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      // console.log(gastoFiltrado);
      setGastosFiltro(gastoFiltrado);
    }
  }, [filtro]);

  //comprobar is ya hay presupuesto y cambiar
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGasto={setGasto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <FiltroR filtro={filtro} setFiltro={setFiltro}></FiltroR>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltro={gastosFiltro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoGastoN}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
