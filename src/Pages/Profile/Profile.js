import React, { useState } from "react";
import "./Profile.css";
import { Settings, MessageCircle, HelpCircle, ShieldCheck, ChevronRight } from "lucide-react";
import plan1 from "../../Assets/Plan/star.png"
import plan2 from "../../Assets/Plan/diamond.png"
import plan3 from "../../Assets/Plan/crown.png"

const Profile = () => {
    const [activeTab, setActiveTab] = useState("safety");
    return (
        <div className="Profile">
            <div className="Profile-main">
                <div className="profile-box">
                    <h2 className="profile-title">Profile</h2>
                    <div className="profile-page">
                        {/* Header Card */}
                        <div className="profile-header">
                            <div className="profile-head">
                                <img
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    alt="profile"
                                    className="profile-img"
                                />
                                <div className="profile-info">
                                    <h3>Serena Pretty</h3>
                                    <p>serenapretty@email.com</p>
                                </div>
                            </div>
                            <div className="profile-stats glass">
                                <div>
                                    <h4>67%</h4>
                                    <p>Reach</p>
                                </div>
                                <div>
                                    <h4>3.4k</h4>
                                    <p>Impression</p>
                                </div>
                                <div>
                                    <h4>2.8</h4>
                                    <p>Credit</p>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="home-location-btn profile-tabs">
                            <div
                                className="active-bg"
                                style={{ transform: activeTab === "safety" ? "translateX(0%)" : "translateX(100%)" }}
                            ></div>

                            <p
                                className={activeTab === "safety" ? "active" : ""}
                                onClick={() => setActiveTab("safety")}
                            >
                                Nearby
                            </p>
                            <p
                                className={activeTab === "plans" ? "active" : ""}
                                onClick={() => setActiveTab("plans")}
                            >
                                For You
                            </p>
                        </div>

                        {/* Tab Content */}
                        <div className="profile-content">
                            {activeTab === "safety" && (
                                <div className="menu-list">
                                    <div className="menu-item">
                                        <Settings size={20} /> <span>Settings</span> <ChevronRight />
                                    </div>
                                    <div className="menu-item">
                                        <MessageCircle size={20} /> <span>Message</span> <ChevronRight />
                                    </div>
                                    <div className="menu-item">
                                        <HelpCircle size={20} /> <span>Get help</span> <ChevronRight />
                                    </div>
                                    <div className="menu-item">
                                        <ShieldCheck size={20} /> <span>Verify</span> <ChevronRight />
                                    </div>
                                </div>
                            )}

                            {activeTab === "plans" && (
                                <div className="plans-list">
                                    <div className="plan">
                                        <img src={plan1} alt="" />
                                        <div className="plan-detail">
                                            <h4>3 Months</h4>
                                            <p>₹9.83 per month</p>
                                        </div>
                                        <span>₹29.50</span>
                                    </div>
                                    <div className="plan">
                                        <img src={plan2} alt="" />
                                        <div className="plan-detail">
                                            <h4>6 Months</h4>
                                            <p>₹9 per month</p>
                                        </div>
                                        <span>₹54.20</span>
                                    </div>
                                    <div className="plan">
                                        <img src={plan3} alt="" />
                                        <div className="plan-detail">
                                            <h4>12 Months</h4>
                                            <p>₹6 per month</p>
                                        </div>
                                        <span>₹72.90</span>
                                    </div>
                                    <button className="subscribe-btn">Subscribe Now</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
