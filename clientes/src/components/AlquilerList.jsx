import AlquilerCard from "./AlquilerCard";

function AlquilerList({ alquileres, onStatusChange }) {
  if (alquileres.length === 0) {
    return (
      <div className="empty-state">
        <h2>No hay alquileres todavía</h2>
        <p>Usa “Crear alquiler” para agregar el primero.</p>
      </div>
    );
  }

  return (
    <section className="rental-grid" aria-label="Alquileres">
      {alquileres.map((alquiler) => (
        <AlquilerCard
          key={alquiler._id}
          alquiler={alquiler}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}

export default AlquilerList;
