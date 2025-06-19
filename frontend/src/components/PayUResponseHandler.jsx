import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PayUResponseHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/payment/success", {
      method: "POST",
      body: new URLSearchParams(window.location.search),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          navigate("/payment-success");
        } else {
          navigate("/payment-failure");
        }
      })
      .catch(() => {
        navigate("/payment-failure");
      });
  }, [navigate]);

  return <div>Processing payment...</div>;
};

export default PayUResponseHandler;
