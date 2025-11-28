import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";
import NoteContext from "../../Context/NikhaContext";

const Subscription = () => {
  const { getPlans, plans } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/welcome");
    } else {
      getPlans();
    }
  }, [navigate]);

  // console.log(plans,"plans")

  return (
    <div className="Profile">
      <div className="Profile-main">
        <div className="profile-box">
          <div className="profile-title subscription-title">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Subscription Plans</h2>
          </div>
          <div className="profile-page">
            {plans.map((plan) => (
              <div key={plan._id} className="subscription-card">
                <div className="sub-plan-top">
                  <div className="sub-plan-top-left">
                    {/* {lastBought === plan.plan && (
                      <h6 className="last-subs">Last Subscribed</h6>
                    )} */}
                    <h6>
                      {plan.title}
                      {plan.tag && (
                        <span className="status-badge active">{plan.tag}</span>
                      )}
                    </h6>
                    <p>
                      {plan.description}({plan.duration} days)
                    </p>
                  </div>
                  <div className="sub-plan-top-right">
                    <h5>₹{plan.slprice}</h5>
                    <del>{plan.price}</del>
                    {/* <p>+GST</p> */}
                  </div>
                </div>

                <h6
                  className="subs-btn"
                  onClick={() =>
                    navigate("/checkout", {
                      state: { type: "subscription", data: plan },
                    })
                  }
                >
                  Subscribe Now!
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
