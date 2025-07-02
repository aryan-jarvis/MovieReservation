// src/pages/PaymentResponse.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentResponse() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/success`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        debugger;
        if (data.status === "success") {
          navigate("/#/payment-success");
        } else {
          debugger;
          navigate("/#/payment-failure");
        }
      })
      .catch(() => navigate("/payment-failure"));
  }, []);

  return <p>Processing payment...</p>;
}
