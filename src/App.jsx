import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import ParticipantsList from "./pages/ParticipantsList";
import { Toaster } from "react-hot-toast";
import SnowParticles from "./components/SnowParticles";


export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-red-900 text-white relative overflow-hidden">
      {/* Snowfall */}
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[url('/snow.png')] bg-cover animate-[snowfall_20s_linear_infinite]" />

      <BrowserRouter>
      <SnowParticles />
        <nav className="p-4 bg-red-950/70 backdrop-blur-sm flex justify-center space-x-8 text-lg font-semibold shadow">
          <Link to="/" className="hover:text-yellow-300 transition">Register</Link>
          <Link to="/participants" className="hover:text-yellow-300 transition">Participants</Link>
        </nav>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/participants" element={<ParticipantsList />} />
          </Routes>
        </div>
      </BrowserRouter>

      <Toaster position="top-center" />
    </div>
  );
}
