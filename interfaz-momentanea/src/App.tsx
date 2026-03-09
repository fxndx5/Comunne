import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import MisServicios from "./pages/MisServicios";
import Perfil from "./pages/Perfil";
import Navbar from "./components/Navbar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-56 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/matches" element={<AppLayout><Matches /></AppLayout>} />
        <Route path="/mis-servicios" element={<AppLayout><MisServicios /></AppLayout>} />
        <Route path="/perfil" element={<AppLayout><Perfil /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
