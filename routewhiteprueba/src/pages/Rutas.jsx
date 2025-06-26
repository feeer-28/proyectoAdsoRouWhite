// src/pages/Rutas.jsx
import { useEffect, useState } from 'react';
import '../assets/rutas.css';
import { FaBus } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/footer';

function Rutas() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/rutas/listar')
      .then(res => res.json())
      .then(data => {
        console.log("Datos de la API:", data);
        setEmpresas(data);
      })
      .catch(err => console.error('Error cargando rutas:', err));
  }, []);

  return (
    <>
      <Header />
      <main className="rutas-container">
        <h2 className="titulo-principal">Buses disponibles</h2>
        <div className="contenedor-lista">
          {empresas.map((empresa, index) => (
            <section key={index} className="empresa">
              <h3 className="nombre-empresa">{empresa.nombre}</h3>
              <div className="lista-rutas">
                {/* Cambiado de empresa.Ruta a empresa.rutas */}
                {(empresa.rutas || []).map((ruta, i) => (
                  <div className="ruta-card" key={i}>
                    <FaBus className="icono-bus" />
                    <span>{ruta.nombre}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Rutas;
