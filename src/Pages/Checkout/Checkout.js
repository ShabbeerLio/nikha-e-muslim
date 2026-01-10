import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Modal from "../../Components/Modal/Modal";
import Host from "../../Host/Host";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const checkoutData = location.state;
  const { type, data } = checkoutData || {};

  // BASE PRICE
  const basePrice = type === "subscription" ? data.slprice : data.price;

  // Load Coupons From Backend
  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${Host}/api/coupons/getall`);
      const result = await res.json();
      setCoupons(result);
    } catch (err) {
      console.log("Error loading coupons:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Apply Coupon
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setErrorMessage("Please enter a coupon code");
      return;
    }

    const found = coupons.find(
      (c) =>
        c.code.toLowerCase() === couponCode.toLowerCase() &&
        c.status === "enable" &&
        c.type === type
    );

    if (!found) {
      setErrorMessage("Invalid or expired coupon");
      return;
    }

    const newPrice = basePrice - (basePrice * found.discount) / 100;

    setAppliedCoupon(found);
    setDiscountedPrice(newPrice);
    setErrorMessage("");
  };

  // Remove Coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountedPrice(null);
    setCouponCode("");
    setErrorMessage("");
  };

  // Start Subscription (PhonePe Payment)
  const handleSubscribe = async () => {
    setShowModal(true);
    setStatus("Processing");
    try {
      const response = await fetch(`${Host}/api/subscription/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          planId: data._id,
          couponCode: appliedCoupon?.code || "",
        }),
      });

      const result = await response.json();

      if (result) {
        setStatus("Success");
        setTimeout(() => {
          setShowModal(false);
          navigate("/app/");
        }, 2000);
      } else {
        setStatus("Error");
      }
    } catch (err) {
      console.log("Payment Error", err);
      setStatus("Error");
    }
  };

  // Billing Submit
  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setStatus("Processing");
    handleSubscribe();
  };

  if (!checkoutData) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Redirecting...</p>
    );
  }

  return (
    <div className="Home checkout">
      <div className="Home-main">
        <div className="Home-box">
          <div className="matches-title">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Checkout</h2>
          </div>

          <div className="chats-page">
            {/* Selected Plan Info */}
            <div className="checkout-item">
              <div className="checkout-item-box">
                <div className="subscription-card">
                  <div className="sub-plan-top">
                    <div className="sub-plan-top-left">
                      <h6>{data.title}</h6>
                      <p>
                        {data.description} ({data.duration} days)
                      </p>
                    </div>
                    <div className="sub-plan-top-right">
                      <h5>₹{data.slprice}</h5>
                      <del>₹{data.price}</del>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="checkout-list">
              {!appliedCoupon && (
                <div className="checkout-coupon-card">
                  <div className="coupon-box">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>Apply</button>
                  </div>
                  {errorMessage && (
                    <p className="coupon-error">{errorMessage}</p>
                  )}
                </div>
              )}

              {/* Summary */}
              <div className="checkout-total-box">
                <p>
                  Total: <span> ₹{basePrice}</span>
                </p>

                {appliedCoupon && (
                  <>
                    <p>
                      Coupon:
                      <span>
                        <button onClick={handleRemoveCoupon}>Remove</button>
                        <b>{appliedCoupon.code}</b>
                      </span>
                    </p>
                    <p>
                      Discount:
                      <span>
                        -₹
                        {((basePrice * appliedCoupon.discount) / 100).toFixed(
                          2
                        )}
                      </span>
                    </p>
                  </>
                )}

                <h5>
                  Subtotal: <span>₹{discountedPrice || basePrice}</span>
                </h5>
              </div>

              {!showBillingForm && (
                <h6
                  className="checkout-proceed"
                  onClick={() => setShowBillingForm(true)}
                >
                  Proceed to Payment
                </h6>
              )}

              {/* Billing Form */}
              {showBillingForm && (
                <form
                  className="checkout-card billing-form"
                  onSubmit={handleBillingSubmit}
                >
                  <h6>Billing Details</h6>

                  {Object.keys(billingDetails).map((key) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={key.replace(/^\w/, (c) => c.toUpperCase())}
                      value={billingDetails[key]}
                      onChange={(e) =>
                        setBillingDetails({
                          ...billingDetails,
                          [key]: e.target.value,
                        })
                      }
                      required={key === "name" || key === "email"}
                    />
                  ))}

                  <button type="submit" className="checkout-proceed">
                    Confirm & Subscribe
                  </button>
                </form>
              )}

              {/* Processing Modal */}
              <div className={`modal-overlay ${showModal}`}>
                <div className="modal-content liquid-glass">
                  {status === "Processing" && (
                    <>
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/5db8a04e-cabe-49f3-9f4d-f2fc13ff8717/9v40gQFrUM.lottie"
                          loop
                          autoplay
                        />
                        <p className="status-msg">Processing...</p>
                      </div>
                    </>
                  )}
                  {status === "Success" && (
                    <>
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/b08d0607-b021-4196-ba76-e6596d9332e5/o1EFjMW31w.lottie"
                          loop
                          autoplay
                        />
                        <p className="status-msg">Successful</p>
                      </div>
                    </>
                  )}

                  {status === "Error" && (
                    <>
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/dd6421fc-909f-4cd9-a504-52b0e952886c/QsiJljc2b3.lottie"
                          loop
                          autoplay
                        />
                        <p className="status-msg">
                          Payment Failed. Try again later.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
