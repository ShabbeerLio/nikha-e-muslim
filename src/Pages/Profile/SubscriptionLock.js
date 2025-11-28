import { Lock } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionLock = () => {
  const navigate = useNavigate();
  return (
    <div className="contact-overlay">
      <div className="contact-overlay-content">
        <Lock />
        <h5>Upgrade to Premium to view contact details</h5>
      </div>
      <button onClick={() => navigate("/subscription")}>Upgrade Now</button>
    </div>
  );
};

export default SubscriptionLock;
