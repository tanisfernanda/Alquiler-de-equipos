import TaskCard from "./TaskCard";

function TaskList({ equipos }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {equipos.map((equipo) => (
        <TaskCard equipo={equipo} key={equipo._id} />
      ))}
    </div>
  );
}

export default TaskList;