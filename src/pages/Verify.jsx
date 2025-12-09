import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Verify() {
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const id = params.get("id");

    if (!token || !id) {
      setMessage("Invalid verification link.");
      toast.error("Invalid verification link!");
      return;
    }

    fetch(
      `https://secret-santa-backend-k02j.onrender.com/api/participants/verify?token=${token}&id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Email verified successfully!") {
          setMessage("🎉 Email Verified Successfully!");

          // 🔥 SHOW POPUP
          toast.success("Email Verified Successfully!");

          // 🔥 REDIRECT AFTER 1.5 SECONDS
          setTimeout(() => {
            navigate("/participants"); // client-side redirect
          }, 1500);
        } else {
          setMessage("Verification failed.");
          toast.error("Verification failed!");
        }
      })
      .catch(() => {
        setMessage("Verification failed.");
        toast.error("Verification failed!");
      });
  }, []);

  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-3xl font-bold">{message}</h1>
      <p className="opacity-70 mt-3">You will be redirected shortly...</p>
    </div>
  );
}
