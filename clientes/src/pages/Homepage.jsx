import { useEffect, useState } from "react";
import { fetchAlquileres, updateAlquiler } from "../api/alquileresApi";
import AlquilerList from "../components/AlquilerList";

function Homepage() {
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchAlquileres()
      .then(({ data }) => {
        if (active) setAlquileres(data);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.detail ||
              "No se pudieron cargar los alquileres. Verifica que la API y MongoDB estén iniciados.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleStatusChange = async (id, devuelto) => {
    setError("");
    try {
      const { data } = await updateAlquiler(id, { devuelto });
      setAlquileres((current) =>
        current.map((item) => (item._id === id ? data : item)),
      );
    } catch (err) {
      setError(
        err.response?.data?.detail || "No se pudo actualizar el estado del alquiler.",
      );
    }
  };

  return (
    <main className="homepage">
      <section className="page-heading">
        <div>
          <p className="eyebrow">PANEL DE CONTROL</p>
          <h1>Alquileres de equipos</h1>
          <p className="page-description">
            Revisa los equipos alquilados y registra sus devoluciones.
          </p>
        </div>
      </section>

      {error && <p className="notice notice-error" role="alert">{error}</p>}
      {loading ? (
        <p className="list-message" role="status">Cargando alquileres...</p>
      ) : error && alquileres.length === 0 ? null : (
        <AlquilerList
          alquileres={alquileres}
          onStatusChange={handleStatusChange}
        />
      )}
    </main>
  );
}

export default Homepage;
