import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AlquilerForm from "./pages/AlquilerForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/alquileres/new" element={<AlquilerForm />} />
            <Route path="/alquileres/:id" element={<AlquilerForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;