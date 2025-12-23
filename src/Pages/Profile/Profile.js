import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import {
    Settings,
    MessageCircle,
    HelpCircle,
    ShieldCheck,
    ChevronRight,
    EllipsisVertical,
    X,
    Pen,
    Heart,
    Bell,
} from "lucide-react";
import plan1 from "../../Assets/Plan/star.png";
import plan2 from "../../Assets/Plan/diamond.png";
import plan3 from "../../Assets/Plan/crown.png";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";

const Profile = () => {
    const { userDetail, getAccountDetails, allConnected, getAllConnected  } = useContext(NoteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/welcome");
        } else {
            getAccountDetails();
            getAllConnected();
        }
    }, [navigate]);

    const [activeTab, setActiveTab] = useState("safety");
    // console.log(profileData, "profileData")
    const [activeSetting, setActiveSetting] = useState(false);

    const handlelogout = () => {
        localStorage.removeItem("token")
        navigate("/welcome");
    }

    console.log(userDetail, "userDetail")

    return (
        <div className="Profile">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title">
                        <h2>Profile</h2>
                        {/* <EllipsisVertical onClick={() => setActiveSetting(true)} /> */}
                    </div>
                    <div className="profile-page">
                        {/* Header Card */}
                        <div className="profile-header">
                            <div className="profile-head">
                                <img
                                    src={
                                        userDetail?.profilePic?.url
                                            ? userDetail?.profilePic?.url
                                            : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
                                    }
                                    alt="profile"
                                    className="profile-img"
                                />
                                <div className="profile-info">
                                    <h3>
                                        {userDetail?.name}
                                        <Pen
                                            onClick={() =>
                                                navigate(`/profile-detail/${userDetail?._id}`)
                                            }
                                            className="profile-edit"
                                        />
                                    </h3>
                                    <p>{userDetail?.email}</p>
                                </div>
                            </div>
                            <div className="profile-stats glass">
                                <div>
                                    <h4>{allConnected?.length}</h4>
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
                                style={{
                                    transform:
                                        activeTab === "safety"
                                            ? "translateX(0%)"
                                            : "translateX(100%)",
                                }}
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
                                    <div className="menu-item" onClick={() => navigate(`/chats`)}>
                                        <MessageCircle size={20} /> <span>Message</span>{" "}
                                        <ChevronRight />
                                    </div>
                                    <div
                                        className="menu-item"
                                        onClick={() => navigate(`/notification`)}
                                    >
                                        <Bell size={20} /> <span>Ntification</span> <ChevronRight />
                                    </div>
                                    <div
                                        className="menu-item"
                                        onClick={() => navigate(`/wishlist`)}
                                    >
                                        <Heart size={20} /> <span>Wishlist</span> <ChevronRight />
                                    </div>
                                    <div className="menu-item">
                                        <Settings size={20} /> <span>Settings</span>{" "}
                                        <ChevronRight />
                                    </div>
                                    <div className="menu-item">
                                        <HelpCircle size={20} /> <span>Get help</span>{" "}
                                        <ChevronRight />
                                    </div>
                                    <div
                                        className="menu-item"
                                        onClick={() => navigate(`/subscription`)}
                                    >
                                        <ShieldCheck size={20} /> <span>Verify</span>{" "}
                                        <ChevronRight />
                                    </div>
                                </div>
                            )}

                            {activeTab === "plans" && (
                                <>
                                    {userDetail?.subscription?.plan !== "Free" ? (
                                        <div className="subscribed-plan">
                                            <h3>Your Current Plan</h3>
                                            <div className="current-plan-card">
                                                <div className="plan-detail-box">
                                                    <h4>{userDetail?.subscription?.plan} Plan</h4>
                                                    <p>
                                                        Valid Till :{" "}
                                                        {new Date(
                                                            userDetail?.subscription?.expiry
                                                        ).toLocaleDateString()}
                                                    </p>
                                                    <span className="active-badge">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        < div className="plans-list">
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
                                            <button
                                                className="subscribe-btn"
                                                onClick={() => navigate("/subscription")}
                                            >
                                                Subscribe Now
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                            <div >
                                <p className="subscribe-btn logout" onClick={handlelogout}>Log Out</p>
                            </div>
                        </div>
                        <div
                            className={`profile-modal ${activeSetting === true ? "active" : ""
                                }`}
                        >
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
        </div >
    );
};

export default Profile;
