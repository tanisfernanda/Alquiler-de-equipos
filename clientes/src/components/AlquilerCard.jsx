import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AlquilerCard({ alquiler, onStatusChange }) {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const devuelto = Boolean(alquiler.devuelto);

  const handleStatusChange = async (event) => {
    event.stopPropagation();
    setUpdating(true);
    await onStatusChange(alquiler._id, !devuelto);
    setUpdating(false);
  };

  return (
    <article
      className={`rental-card${devuelto ? " is-returned" : ""}`}
      tabIndex={0}
      role="link"
      aria-label={`Editar o borrar alquiler de ${alquiler.equipo_renta}`}
      onClick={() => navigate(`/alquileres/${alquiler._id}`)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget &&
            (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          navigate(`/alquileres/${alquiler._id}`);
        }
      }}
    >
      <div className="rental-card-copy">
        <h2>{alquiler.equipo_renta}</h2>
        <p>{alquiler.cliente} · {alquiler.dias_alquiler} días</p>
      </div>
      <button
        type="button"
        className="status-button"
        title={devuelto ? "Marcar como pendiente" : "Marcar como devuelto"}
        aria-label={devuelto ? "Marcar como pendiente" : "Marcar como devuelto"}
        disabled={updating}
        onClick={handleStatusChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className={`status-icon${devuelto ? " is-returned" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </button>
    </article>
  );
}

export default AlquilerCard;
