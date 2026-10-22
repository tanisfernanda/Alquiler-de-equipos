import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAlquiler,
  deleteAlquiler,
  fetchAlquiler,
  updateAlquiler,
} from "../api/alquileresApi";

function AlquilerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipoRenta, setEquipoRenta] = useState("");
  const [cliente, setCliente] = useState("");
  const [diasAlquiler, setDiasAlquiler] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return undefined;

    let active = true;
    fetchAlquiler(id)
      .then(({ data }) => {
        if (!active) return;
        setEquipoRenta(data.equipo_renta);
        setCliente(data.cliente);
        setDiasAlquiler(data.dias_alquiler);
      })
      .catch((err) => {
        if (active) {
          setError(err.response?.data?.detail || "No se pudo cargar este alquiler.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const alquiler = {
      equipo_renta: equipoRenta.trim(),
      cliente: cliente.trim(),
      dias_alquiler: diasAlquiler,
    };

    try {
      if (id) {
        await updateAlquiler(id, alquiler);
      } else {
        await createAlquiler(alquiler);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "No se pudo guardar el alquiler.");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await deleteAlquiler(id);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "No se pudo borrar el alquiler.");
      setDeleting(false);
    }
  };

  return (
    <main className="form-page">
      <div className="form-column">
        {error && <p className="notice notice-error" role="alert">{error}</p>}
        {loading ? (
          <p className="list-message" role="status">Cargando alquiler...</p>
        ) : (
          <form className="rental-form" onSubmit={handleSubmit}>
            <h1>{id ? "Editar alquiler" : "Crear alquiler"}</h1>
            <label>
              Equipo
              <input
                required
                type="text"
                value={equipoRenta}
                onChange={(event) => setEquipoRenta(event.target.value)}
                autoFocus
              />
            </label>
            <label>
              Cliente
              <input
                required
                type="text"
                value={cliente}
                onChange={(event) => setCliente(event.target.value)}
              />
            </label>
            <label>
              Días de alquiler
              <input
                required
                type="number"
                min="1"
                step="1"
                value={diasAlquiler}
                onChange={(event) => setDiasAlquiler(event.target.value)}
              />
            </label>
            <div className="form-actions">
              <button className="create-button" type="submit" disabled={saving}>
                {saving ? "Guardando..." : id ? "Guardar cambios" : "Crear alquiler"}
              </button>
              <button className="cancel-button" type="button" onClick={() => navigate("/")}>
                Cancelar
              </button>
            </div>
          </form>
        )}
        {id && !loading && (
          <button
            className="delete-button"
            type="button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Borrando..." : "Borrar alquiler"}
          </button>
        )}
      </div>
    </main>
  );
}

export default AlquilerForm;
