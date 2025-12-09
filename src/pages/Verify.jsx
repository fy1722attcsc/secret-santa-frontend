import { useEffect, useState } from "react";

export default function Verify() {
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const id = params.get("id");

    if (!token || !id) {
      setMessage("Invalid verification link.");
      return;
    }

    fetch(`https://secret-santa-backend-k02j.onrender.com/api/participants/verify?token=${token}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) setMessage(data.message);
        else setMessage("Verification failed.");
      })
      .catch(() => setMessage("Verification failed."));
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center", color: "#fff" }}>
      <h1>{message}</h1>
    </div>
  );
}
