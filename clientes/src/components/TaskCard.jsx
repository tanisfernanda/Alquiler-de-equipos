import { useNavigate } from "react-router-dom";
import { updateEquipo } from "../api/equipos";

function TaskCard({ equipo }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950"
      onClick={() => {
        navigate(`/equipos/${equipo._id}`);
      }}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">{equipo.nombre}</h2>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            const res = await updateEquipo(equipo._id, {
              disponible: !equipo.disponible,
            });
            if (res.status === 200) {
              window.location.reload();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${
              equipo.disponible ? "text-green-500" : "text-gray-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
      <p className="text-slate-300">{equipo.descripcion}</p>
    </div>
  );
}

export default TaskCard;