import React from "react";
import "./Modal.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Modal = ({ loading, profilestatus }) => {
  return (
    <div className={`modal-overlay ${loading}`}>
      <div className="modal-box">
        <DotLottieReact
          className="loading-animation"
          src="https://lottie.host/5db8a04e-cabe-49f3-9f4d-f2fc13ff8717/9v40gQFrUM.lottie"
          loop
          autoplay
          onError={(e) => console.error("Lottie load error:", e)}
        />
        {profilestatus ? (
          <p>{profilestatus}</p>
        ) : (
          <>
            <p>Processing...</p>
            <p>Please Wait</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
