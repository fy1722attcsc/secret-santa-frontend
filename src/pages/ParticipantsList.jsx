import { useEffect, useState } from "react";
import api from "../api/apiClient";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ParticipantsList() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadParticipants = async () => {
    setLoading(true);
    const res = await api.get("/participants/verified/all");
    setParticipants(res.data.participants);
    setLoading(false);
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/");
    toast.success("Invite link copied!");
  };

  const handleDraw = async () => {
    try {
      const res = await api.post("/draw");
      toast.success(res.data.message);
      loadParticipants();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Draw failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6 mt-10 text-white"
    >
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-300">
        🎄 Verified Participants
      </h1>

      <button
        onClick={handleCopy}
        className="w-full mb-4 bg-yellow-400 text-red-900 py-2 rounded-lg hover:bg-yellow-300 transition font-bold"
      >
        Copy Invite Link
      </button>

      {loading ? (
        <p className="text-center text-yellow-200">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {participants.map((p, i) => (
            <li
              key={i}
              className="p-3 bg-red-800/60 backdrop-blur-sm rounded-lg shadow"
            >
              <strong>{p.name}</strong>
              <div className="text-yellow-200 text-sm">{p.email}</div>
            </li>
          ))}
        </ul>
      )}

      {participants.length >= 3 && (
        <button
          onClick={handleDraw}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-400 transition"
        >
          Run Secret Santa Draw
        </button>
      )}
    </motion.div>
  );
}
