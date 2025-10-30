import React from "react";
import congrats from "../../Assets/congrats.png";
import { useNavigate } from "react-router-dom";

const Congrats = () => {

    const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-box">
        <h2>Congrats!</h2>
        <p>Now enjoy life with your highlighted partner 💕</p>
        <div className="illustration">
          <img src={congrats} alt="congrats" />
        </div>
        <button className="btn primary" onClick={() => navigate("/")}>Proceed</button>
      </div>
    </div>
  );
};

export default Congrats;
