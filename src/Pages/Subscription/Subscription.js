import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";

const Subscription = () => {
  const navigate = useNavigate();

  const plans = [
    {
      _id: "sub1",
      plan: "Monthly",
      description: "Perfect for individuals looking to explore our platform.",
      price: "₹999",
      slprice: "499",
      tag: "",
    },
    {
      _id: "sub2",
      plan: "Quarterly",
      description: "Ideal for users seeking enhanced features and benefits.",
      price: "₹1999",
      slprice: "999",
      tag: "Most Popular",
    },
    {
      _id: "sub3",
      plan: "Yearly",
      description:
        "Best for those who want the ultimate experience with all features unlocked.",
      price: "₹2999",
      slprice: "1499",
      tag: "",
    },
  ];

  const lastBought = "Monthly";

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
                    {lastBought === plan.plan && (
                      <h6 className="last-subs">Last Subscribed</h6>
                    )}
                    <h6>
                      {plan.plan}{" "}
                      {plan.tag && (
                        <span className="status-badge active">{plan.tag}</span>
                      )}{" "}
                    </h6>
                    <p>{plan.description}</p>
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
