import React, { useState } from "react";
import "./Profile.css";
import { Settings, MessageCircle, HelpCircle, ShieldCheck, ChevronRight, EllipsisVertical, X } from "lucide-react";
import plan1 from "../../Assets/Plan/star.png"
import plan2 from "../../Assets/Plan/diamond.png"
import plan3 from "../../Assets/Plan/crown.png"
import profileData from "../../Profile"

const Profile = () => {
    const [activeTab, setActiveTab] = useState("safety");
    console.log(profileData, "profileData")
    const [activeSetting, setActiveSetting] = useState(false)
    return (
        <div className="Profile">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title">
                        <h2>Profile</h2>
                        <EllipsisVertical onClick={() => setActiveSetting(true)} />
                    </div>
                    <div className="profile-page">
                        {/* Header Card */}
                        <div className="profile-header">
                            <div className="profile-head">
                                <img
                                    src={profileData.avatar}
                                    alt="profile"
                                    className="profile-img"
                                />
                                <div className="profile-info">
                                    <h3>{profileData.userName}</h3>
                                    <p>{profileData.email}</p>
                                </div>
                            </div>
                            <div className="profile-stats glass">
                                <div>
                                    <h4>8</h4>
                                    <p>Active With</p>
                                </div>
                                <span></span>
                                <div>
                                    <h4>3.4k</h4>
                                    <p>Impression</p>
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
                                Safety
                            </p>
                            <p
                                className={activeTab === "plans" ? "active" : ""}
                                onClick={() => setActiveTab("plans")}
                            >
                                Subscription
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
                        <div className={`profile-modal ${activeSetting === true ? "active" : ""}`}>
                            <div className="modal-notch"></div>

                            {/* Close button */}
                            <div
                                className="close-profile-modal"
                                onClick={() => setActiveSetting(false)}
                            >
                                <X />
                            </div>

                            {/* Content */}
                            <div className="profile-modal-box">
                                <ul>
                                    <li>Edit Profile</li>
                                    <li>Share Profile</li>
                                    <li>Account Settings</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
