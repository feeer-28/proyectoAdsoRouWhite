import Header from "../components/Header";
import Footer from "../components/footer.jsx";
import "../assets/inicio.css";

function Inicio() {
  return (
    <>
      <Header />
      <main className="inicio-container">
        <section className="illustration">
          <img
            src="https://i.redd.it/bl6e1g66yxla1.jpg"
            alt="Ilustración de ciudad y bus"
          />
        </section>

        <section className="turismo">
          <div className="contenido-turismo">
            <h2>
              <i className="fas fa-landmark"></i> Turismo
            </h2>
            <div className="boton-con-imagen">
              <button>¡Click aquí!</button>
            </div>
            <p className="descripcion">
              La ciudad se caracteriza por su arquitectura colonial, amplias plazas y calles arboladas que invitan al paseo. A lo largo del día, el movimiento de personas y vehículos crea un ambiente dinámico, mientras que por la tarde, la luz cálida del atardecer tiñe los edificios históricos de tonos dorados...
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Inicio;

