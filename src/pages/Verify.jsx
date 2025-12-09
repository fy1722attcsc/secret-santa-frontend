import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/apiClient";

export default function Verify() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const id = params.get("id");

    if (!token || !id) {
      toast.error("Invalid verification link");
      navigate("/");
      return;
    }

    (async () => {
      try {
        // Call your backend via the same API client as the rest of the app
        const res = await api.get(`/participants/verify?token=${token}&id=${id}`);
        console.log("Verify response:", res.data);

        if (res.data?.message === "Email verified successfully!") {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            navigate("/participants");
          }, 1500);
        } else {
          toast.error(res.data?.message || "Verification failed");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (err) {
        console.error("Verify API error:", err);
        toast.error(err?.response?.data?.message || "Verification failed");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    })();
  }, [navigate]);

  return (
    <div className="text-center p-10 text-white">
      <h1 className="text-3xl font-bold">Verifying your email...</h1>
      <p className="opacity-70 mt-3">
        Please wait, this will only take a moment.
      </p>
    </div>
  );
}
