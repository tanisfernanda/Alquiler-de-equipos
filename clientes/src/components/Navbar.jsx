import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <Link className="site-title" to="/">
        <h1 className="text-3xl font-bold">Alquiler de Equipos</h1>
      </Link>
      <Link
        to="/alquileres/new"
        className="create-button"
      >
        Crear alquiler
      </Link>
    </header>
  );
}

export default Navbar;