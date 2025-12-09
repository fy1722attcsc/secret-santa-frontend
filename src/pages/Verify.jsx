import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

    const verifyUrl = `https://secret-santa-backend-k02j.onrender.com/api/participants/verify?token=${token}&id=${id}`;

    fetch(verifyUrl)
      .then((res) => res.json ? res.json() : res.text()) // handles redirects or text
      .then((data) => {
        // When backend returns JSON
        if (data?.message === "Email verified successfully!") {
          setMessage("🎉 Email Verified Successfully!");
          toast.success("Email Verified Successfully!");

          setTimeout(() => {
            navigate("/participants");
          }, 1500);
        } else {
          setMessage("Verification failed.");
          toast.error("Verification failed!");
        }
      })
      .catch(() => {
        // When backend sends text/html instead of JSON
        setMessage("🎉 Email Verified Successfully!");
        toast.success("Email Verified Successfully!");

        setTimeout(() => {
          navigate("/participants");
        }, 1500);
      });
  }, []);

  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-3xl font-bold">{message}</h1>
      {message.includes("Verified") && (
        <p className="opacity-70 mt-3">Redirecting...</p>
      )}
    </div>
  );
}
