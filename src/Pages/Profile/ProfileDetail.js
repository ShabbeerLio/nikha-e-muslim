import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProfileDetail.css";
import {
    Ban,
    BriefcaseBusiness,
    Check,
    CheckCheck,
    ChevronLeft,
    EllipsisVertical,
    GraduationCap,
    Heart,
    ImagePlus,
    Images,
    Languages,
    Lock,
    Mail,
    MapPinHouse,
    MessageCircle,
    MessageCircleHeart,
    MoonStar,
    Pen,
    Phone,
    Ruler,
    ScanHeart,
    Star,
    Timer,
    User,
    UserPen,
    UserRoundPlus,
    WalletMinimal,
    X,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdFamilyRestroom } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Host from "../../Host/Host";
import NoteContext from "../../Context/NikhaContext";
import defaultimg from "../../Assets/default.jpg";
import Modal from "../../Components/Modal/Modal";
import SubscriptionLock from "./SubscriptionLock";

const ProfileDetail = () => {
    const { userDetail, getAccountDetails } = useContext(NoteContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [matchedItems, setMatchedItems] = useState()
    const [showOptions, setShowOptions] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestsent, setRequestSent] = useState(false)
    const [reportUser, setReportUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)

    const [reportReason, setReportReason] = useState("");
    const [reportDescription, setReportDescription] = useState("");
    const [reportSuccess, setReportSuccess] = useState(false);
    const [connectionNote, setConnectionNote] = useState(false);

    const [contactPrivacyModal, setContactPrivacyModal] = useState(false)
    const [contactPrivacyError, setContactPrivacyError] = useState("")

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/app/welcome");
        } else {
            getAccountDetails();
        }
    }, [navigate]);

    const fetchUser = async () => {
        try {
            const response = await fetch(`${Host}/api/auth/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            setUser(data);
            if (data.blocked) {
                setIsBlocked(true);
            } else {
                setIsBlocked(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser()

        const fetchMatched = async () => {
            try {
                const response = await fetch(`${Host}/api/match/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                const data = await response.json();
                setMatchedItems(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMatched();
        fetchUser();
    }, [id]);

    const [status, setStatus] = useState(null);
    // console.log(isBlocked, "isBlocked")

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`${Host}/api/connection/status/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setStatus(data.status); // e.g., "Pending", "Accepted", "Rejected", "Blocked"
                } else {
                    setStatus(null);
                }
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        if (id && userDetail?._id) {
            fetchStatus();
        }
    }, [id, userDetail]);

    const personal = userDetail?._id === id;
    //   console.log(personal, "personal");
    const [subscriptionPlan, setSubscriptionPlan] = useState(
        userDetail.subscription?.plan || "Free"
    );
    // console.log(userDetail, "userDetail")

    // 🔹 Tabs
    const tabs = [
        { key: "basic", label: "Basic" },
        { key: "contact", label: "Contact" },
        { key: "education", label: "Education & Career" },
        { key: "family", label: "Family" },
        { key: "religious", label: "Religious Detail" },
        { key: "lifestyle", label: "Lifestyle & Interest" },
    ];

    const [activeTab, setActiveTab] = useState("basic");

    const [showFullBio, setShowFullBio] = useState(false);
    const truncateWords = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    // 🔹 Section refs
    const sectionRefs = {
        basic: useRef(null),
        contact: useRef(null),
        education: useRef(null),
        family: useRef(null),
        religious: useRef(null),
        lifestyle: useRef(null),
    };

    // 🔹 Scroll to section when tab clicked
    const handleTabClick = (key) => {
        const section = sectionRefs[key].current;
        const container = containerRef.current;

        if (section && container) {
            container.scrollTo({
                top: section.offsetTop, // scroll directly to section’s top
                behavior: "smooth",
            });
        }
    };

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            let current = "basic";

            Object.entries(sectionRefs).forEach(([key, ref]) => {
                if (ref.current) {
                    const offsetTop = ref.current.offsetTop;
                    const distance = container.scrollTop - offsetTop;

                    // if section top is <= scrollTop, it has reached the top
                    if (distance >= -30) {
                        current = key;
                    }
                }
            });

            setActiveTab(current);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const galleryImages = user.images || [];

    // console.log(user, "user");
    const sendInderest = async (receiverId) => {
        setLoading(true);
        try {
            const response = await fetch(`${Host}/api/connection/send/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                }
            });
            const data = await response.json();
            if (response.ok) {
                setStatus("Pending");
                setLoading(false);
            } else {
                console.error("Error sending interest:", data.error);
            }
        } catch (error) {
            console.error("Error sending interest:", error);
        }
    };

    const handleWishlist = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${Host}/api/wishlist/add/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (response.ok) {
                getAccountDetails();
                setLoading(false);
            } else {
                console.error("Error updating wishlist:", data.error);
            }
        } catch (error) { console.error("Error updating wishlist:", error); }
    };
    const handleRemoveWishlist = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${Host}/api/wishlist/remove/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (response.ok) {
                getAccountDetails();
                setLoading(false);
            } else {
                console.error("Error updating wishlist:", data.error);
            }
        } catch (error) { console.error("Error updating wishlist:", error); }
    };

    const calculateAge = (day, month, year) => {
        if (!day || !month || !year) return "";

        const monthIndex = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ].indexOf(month);

        const dob = new Date(year, monthIndex, day);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    const handleBlock = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/api/auth/block/${id}`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (res.ok) {
                setIsBlocked(true);
                setShowOptions(false);
                setShowBlockModal(false)
                fetchUser()
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnblock = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/api/auth/block/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (res.ok) {
                setIsBlocked(false);
                setShowBlockModal(false);
                fetchUser()
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleRequestProfilePic = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/api/auth/request-picture/${id}`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (res.ok) {
                setRequestSent(true)
                setTimeout(() => {
                    setRequestSent(false)
                }, 3000);
                setLoading(false);
            }

            setShowRequestModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReportSubmit = async () => {
        if (!reportReason) {
            alert("Please select a reason");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${Host}/api/auth/report/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    reason: reportReason,
                    description: reportDescription,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setReportSuccess(true);
                setTimeout(() => setReportSuccess(false), 3000);
                setReportUser(false);
                setReportReason("");
                setReportDescription("");
            } else {
                alert(data.msg || "Report failed");
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleDeleteConnection = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/api/connection/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            if (res.ok) {
                setDeleteUser(false);
                setStatus("none"); // update UI
                setConnectionNote(true)
                setTimeout(() => {
                    setConnectionNote(false)
                }, 3000);
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };
    const handleRequestContactPrivacy = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${Host}/api/auth/request-contact/${id}`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });


            const data = await res.json();

            if (res.ok) {
                setContactPrivacyModal(true);
                setContactPrivacyError(data.msg)
                setTimeout(() => {
                    setContactPrivacyModal(false)
                    setContactPrivacyError("");
                }, 3000);
            } else {
                setContactPrivacyError(data.msg);
                setContactPrivacyModal(true);
                setTimeout(() => {
                    setContactPrivacyModal(false)
                    setContactPrivacyError("");
                }, 3000);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const percent = user.profileCompletion;
    const getColor = () => {
        if (percent <= 20) return "#ff3b3b";
        if (percent <= 50) return "#ff8c00";
        if (percent <= 70) return "#ffd400";
        return "#00c853";
    };

    const isAllowedToSeePic = user?.profilePic?.allowedUsers?.includes(userDetail?._id);
    const isAllowedContact =
        user?.contactPrivacy?.allowedUsers?.includes(userDetail?._id);

    const isContactHidden = user?.contactPrivacy?.isHidden;
    // console.log(userDetail, "userDetail")

    // console.log(user, "user")

    // console.log(subscriptionPlan, "subscriptionPlan")

    return (
        <div className="Profile-detail">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title">
                        <ChevronLeft onClick={() => navigate(-1)} />
                        <h2>Profile Detail</h2>
                        <EllipsisVertical onClick={() => setShowOptions(true)} />
                    </div>
                    <div className="profile-detail-top">
                        <div className="profile-detail-top-image">
                            {personal ? (
                                <img
                                    src={
                                        user?.profilePic?.url
                                            ? user?.profilePic?.url
                                            : defaultimg
                                    }
                                    alt="profile"
                                />
                            ) : (
                                <img
                                    className={
                                        user.profilePic?.isHidden && !isAllowedToSeePic
                                            ? "blurred-image"      // hide if hidden + not allowed
                                            : ""
                                    }
                                    src={user?.profilePic?.url ? user.profilePic.url : defaultimg}
                                    alt="profile"
                                />
                            )}

                            {personal ? (
                                <ImagePlus onClick={() => navigate(`/app/profile-edit/images`)} />
                            ) : (
                                <>
                                    {user.profilePic?.isHidden && !isAllowedToSeePic ? (
                                        // 🔹 Hidden + not allowed → No modal
                                        <Images onClick={() => setShowRequestModal(true)} />
                                    ) : (
                                        // 🔹 Public OR hidden but allowed → modal open
                                        <Images onClick={() => setIsModalOpen(true)} />
                                    )}
                                </>
                            )}
                        </div>
                        <h2>{user?.name || "-"} , {user?.age ? user?.age : calculateAge(user?.dob?.day, user?.dob?.month, user?.dob?.year)}</h2>
                        <p>{user?.city || "-"}</p>
                    </div>
                    {/* 🔹 Tabs */}
                    <div className="profile-detail-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                                onClick={() => handleTabClick(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="profile-detail-bottom" ref={containerRef}>
                        <div className="profile-completion">
                            <p>Profile Completion: {percent}%</p>
                            <div className="battery-wrapper">
                                <div className="battery">
                                    <div
                                        className="battery-level"
                                        style={{
                                            width: `${percent}%`,
                                            background: getColor(),
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        {!isBlocked ?
                            <>
                                {!personal && (
                                    <div className="profile-detail-bottom-box">
                                        <h2>Matched</h2>
                                        <ul>
                                            {matchedItems?.matchedFields?.slice()
                                                .reverse()
                                                .map((field, i) => (
                                                    <li key={i}><MoonStar /> {field} <CheckCheck className="matched" /></li>
                                                ))}
                                        </ul>
                                        <p style={{ color: "green" }}>Your profile matched {matchedItems?.matchPercentage}%</p>
                                    </div>
                                )}
                                <section id="basic" ref={sectionRefs.basic}>
                                    <div className="profile-detail-bottom-box">
                                        <h2>
                                            Basic Details{" "}
                                            {personal && (
                                                <Pen onClick={() => navigate(`/app/profile-edit/basic`)} />
                                            )}
                                        </h2>
                                        <ul>
                                            <li>Dowry: {user?.dowry}</li>
                                            <li>Nikah As Sunnat: {user?.nikahAsSunnat}</li>
                                            <li>
                                                <ScanHeart />
                                                {user?.maritalStatus || "-"}
                                            </li>
                                            <li>
                                                <Ruler />
                                                {user?.height?.ft && user?.height?.inch ? user?.height?.ft + " ft " + user?.height?.inch + " inch" : "-"}
                                            </li>
                                            <li>
                                                <MapPinHouse /> {user?.city && user?.state ? user?.city + ", " + user?.state : "-"}
                                            </li>
                                            <li>
                                                <Languages /> {user?.motherTongue}
                                            </li>
                                            <li>
                                                <MoonStar />
                                                {user?.sect && user?.caste && user?.maslak ? user?.sect + ", " + user?.caste + ", " + user?.maslak : "-"}
                                            </li>
                                            <li>
                                                <UserPen />
                                                {user?.profileFor ? `Profile created for ${user?.profileFor}` : "-"}
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="profile-detail-bottom-box">
                                        <h2>
                                            {user?.name}'s Bio{" "}
                                            {personal && (
                                                <Pen onClick={() => navigate(`/app/profile-edit/bio`)} />
                                            )}
                                        </h2>
                                        <p>
                                            {user?.about ? (
                                                <>
                                                    {showFullBio
                                                        ? `${user?.about}`
                                                        : truncateWords(`${user?.about}`, 20)}
                                                    <span
                                                        className="view-more-btn"
                                                        onClick={() => setShowFullBio(!showFullBio)}
                                                    >
                                                        {showFullBio ? "View Less" : "View More"}
                                                    </span>
                                                </>
                                            ) : (
                                                <>-</>
                                            )}
                                        </p>
                                    </div>
                                </section>

                                <section
                                    className="profile-detail-bottom-box"
                                    id="contact"
                                    ref={sectionRefs.contact}
                                >
                                    <h2>
                                        Contact{" "}
                                        {personal && (
                                            <Pen onClick={() => navigate(`/app/profile-edit/contact`)} />
                                        )}
                                    </h2>

                                    {/* 🔐 Subscription Lock */}
                                    {subscriptionPlan === "Free" && !personal ? (
                                        <div className="contact-overlay">
                                            <div className="contact-overlay-content">
                                                <Lock />
                                                <h5>Upgrade to Premium to view contact details</h5>
                                            </div>
                                            <button onClick={() => navigate("/app/subscription")}>
                                                Upgrade Now
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {/* 🔒 Privacy Lock */}
                                            {isContactHidden && !isAllowedContact && !personal ? (
                                                <div className="contact-overlay">
                                                    <div className="contact-overlay-content">
                                                        <Lock />
                                                        <h5>Contact information is hidden</h5>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRequestContactPrivacy()}
                                                    >
                                                        Request Access
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p>
                                                        <MapPinHouse /> {user.city + ", " + user?.state + ", India"}
                                                    </p>
                                                    <p>
                                                        <Mail /> {user?.email}
                                                    </p>
                                                    <p>
                                                        <Phone /> {user?.mobile}
                                                    </p>
                                                    <p style={{ color: "green" }}>
                                                        <FaWhatsapp style={{ color: "green" }} />{" "}
                                                        {user?.whatsapp || "Not Added"}
                                                    </p>
                                                </>
                                            )}
                                        </>
                                    )}
                                </section>

                                <section
                                    className="profile-detail-bottom-box"
                                    id="education"
                                    ref={sectionRefs.education}
                                >
                                    <h2>
                                        Education & Career{" "}
                                        {personal && (
                                            <Pen onClick={() => navigate(`/app/profile-edit/education`)} />
                                        )}
                                    </h2>
                                    <div className="profile-detail-bottom-card">
                                        <GraduationCap />
                                        <div className="profiledetail-card-detail">
                                            <h6>{user?.qualification || "Qualification"}</h6>
                                            <p>{user?.institute || "-"}</p>
                                        </div>
                                    </div>
                                    <div className="profile-detail-bottom-card">
                                        <BriefcaseBusiness />
                                        <div className="profiledetail-card-detail">
                                            <h6>{user?.profession || "Profession"}</h6>
                                            <p>{user?.workSector || "-"}</p>
                                        </div>
                                    </div>
                                    <div className="profile-detail-bottom-card">
                                        <WalletMinimal />
                                        <div className="profiledetail-card-detail">
                                            <h6>Rs. {user?.income || "-"}</h6>
                                            <p>Annual Income</p>
                                        </div>
                                    </div>
                                </section>

                                <section
                                    className="profile-detail-bottom-box"
                                    id="family"
                                    ref={sectionRefs.family}
                                >
                                    <h2>
                                        Family{" "}
                                        {personal && (
                                            <Pen onClick={() => navigate(`/app/profile-edit/family`)} />
                                        )}
                                    </h2>
                                    {subscriptionPlan === "Free" && !personal ? (
                                        <SubscriptionLock />
                                    ) : (
                                        <>
                                            <div className="profile-detail-bottom-card">
                                                <MdFamilyRestroom />
                                                <div className="profiledetail-card-detail">
                                                    <h6>Family Lives in</h6>
                                                    <p>{user.family?.location || "-"}</p>
                                                    <h6>Family Status</h6>
                                                    <p>{user.family?.status || "-"}</p>
                                                    <h6>Family Type</h6>
                                                    <p>{user.family?.type || "-"}</p>
                                                </div>
                                            </div>
                                            <div className="profile-detail-bottom-card">
                                                <UserRoundPlus />
                                                <div className="profiledetail-card-detail">
                                                    <h6>Father's Name</h6>
                                                    <p>{user.family?.fatherName || "-"}</p>
                                                    <h6>Father's Occupation</h6>
                                                    <p>{user.family?.fatherOccupation || "-"}</p>
                                                    <h6>Mother's Occupation</h6>
                                                    <p>{user.family?.motherOccupation || "-"}</p>
                                                    <h6>No. of brothers</h6>
                                                    <p>{user.family?.brothers || "-"}</p>
                                                    <h6>No. of sisters</h6>
                                                    <p>{user.family?.sisters || "-"}</p>
                                                    <h6>About Family</h6>
                                                    <p>{user.family?.about || "-"}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </section>

                                <section
                                    className="profile-detail-bottom-box"
                                    id="religious"
                                    ref={sectionRefs.religious}
                                >
                                    <h2>
                                        Religious Detail{" "}
                                        {personal && (
                                            <Pen onClick={() => navigate(`/app/profile-edit/religious`)} />
                                        )}
                                    </h2>
                                    {subscriptionPlan === "Free" && !personal ? (
                                        <SubscriptionLock />
                                    ) : (
                                        <div className="profile-detail-bottom-card ">
                                            <div className="lifestyle-card">
                                                {user?.religiousDetail?.map((item) => (
                                                    <p key={item}>{item}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </section>

                                <section
                                    className="profile-detail-bottom-box"
                                    id="lifestyle"
                                    ref={sectionRefs.lifestyle}
                                >
                                    <h2>
                                        Lifestyle & Interest{" "}
                                        {personal && (
                                            <Pen onClick={() => navigate(`/app/profile-edit/lifestyle`)} />
                                        )}
                                    </h2>
                                    {subscriptionPlan === "Free" && !personal ? (
                                        <SubscriptionLock />
                                    ) : (
                                        <div className="profile-detail-bottom-card">
                                            <div className="lifestyle-card">
                                                {user?.interest?.map((item) => (
                                                    <p key={item}>{item}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </>
                            : <>
                                <Ban style={{ color: "red" }} />{user?.msg}
                            </>}
                    </div>
                    {!personal && (
                        <div className="profiledetail-chat">
                            {userDetail?.wishlist?.includes(user._id) ? (
                                <p onClick={() => handleRemoveWishlist(user._id)}>
                                    <Heart style={{ fill: "pink" }} /> Wishlisted
                                </p>
                            ) : (
                                <p onClick={() => handleWishlist(user._id)}>
                                    <Heart /> Wishlist
                                </p>
                            )}

                            {status === "Accepted" ? (
                                <p
                                    className="Accepted"
                                    onClick={() => navigate(`/app/chats`)}
                                >
                                    <MessageCircle />
                                    Chat
                                </p>
                            ) : status === "Pending" ? (
                                <p className="Pending">
                                    <Timer />
                                    Pending
                                </p>
                            ) : status === "Rejected" ? (
                                <p className="Rejected" style={{ color: "red" }}>
                                    <X />
                                    Rejected
                                </p>
                            ) : status === "Blocked" ? (
                                <p className="Blocked" style={{ color: "gray" }}>
                                    <Lock />
                                    Blocked
                                </p>
                            ) : (
                                <p
                                    className="Interested"
                                    onClick={() => sendInderest(user._id)}
                                >
                                    <Star />
                                    Interested
                                </p>
                            )}
                        </div>
                    )}
                    {/* Modal */}
                    {isModalOpen && (
                        <div className="image-modal">
                            <div className="image-modal-content">
                                <button
                                    className="close-btn"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <X size={24} />
                                </button>

                                {/* Full Screen Image */}
                                <div className="full-image">
                                    <img
                                        src={galleryImages[selectedIndex]}
                                        alt={`Gallery ${selectedIndex}`}
                                    />
                                </div>

                                <div className="image-tabs">
                                    {galleryImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`thumb-${index}`}
                                            className={`thumbnail ${index === selectedIndex ? "active" : ""
                                                }`}
                                            onClick={() => setSelectedIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {showOptions && (
                        <div className="options-popup" onClick={() => setShowOptions(false)}>
                            <div className="options-box">
                                {!personal ? (
                                    <>
                                        <p onClick={() => {
                                            setShowOptions(false);
                                            setShowRequestModal(true);
                                        }}>
                                            Request Profile Picture
                                        </p>

                                        <p
                                            onClick={() => {
                                                setShowOptions(false);
                                                setShowBlockModal(true);
                                            }}
                                        >
                                            {!isBlocked ? "Block User" : "Unblock User"}
                                        </p>
                                        <p onClick={() => setReportUser(true)}>Report User</p>
                                        {status === "Accepted" && (
                                            <p onClick={() => setDeleteUser(true)} className="cancel-btn" >Delete Connection</p>
                                        )}

                                    </>
                                ) :
                                    <>
                                        <p onClick={() => {
                                            setShowOptions(false);
                                            setShowRequestModal(true);
                                        }}>
                                            Profile Picture Privacy
                                        </p>
                                        <p
                                            onClick={async () => {
                                                await fetch(`${Host}/api/auth/toggle-contact-privacy`, {
                                                    method: "PUT",
                                                    headers: {
                                                        "auth-token": localStorage.getItem("token"),
                                                    },
                                                });
                                                fetchUser();
                                            }}
                                        >
                                            Toggle Contact Privacy
                                        </p>
                                    </>}

                            </div>
                        </div>
                    )}
                    {showBlockModal && (
                        <div className="profiledetail-overlay">
                            <div className="modal-box">
                                <button className="close-btn" onClick={() => setShowBlockModal(false)}>
                                    <X />
                                </button>

                                {!isBlocked ? (
                                    <>
                                        <h3>Block this user?</h3>
                                        <p>If you block this user, they will not be able to see your profile.</p>

                                        <button className="block-btn" onClick={handleBlock}>
                                            Block User
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h3>You have blocked this user</h3>
                                        <p>Unblock to see the profile again.</p>

                                        <button className="unblock-btn" onClick={handleUnblock}>
                                            Unblock User
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {showRequestModal && (
                        <div className="profiledetail-overlay">
                            {!personal ? (
                                <div className="modal-box">
                                    <h4>Request to view profile picture?</h4>
                                    <p>The user will be notified.</p>

                                    <div className="modal-button-box">
                                        <button className="yes-btn" onClick={handleRequestProfilePic}>Yes</button>
                                        <button className="no-btn" onClick={() => setShowRequestModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            ) :
                                <div className="modal-box">
                                    <h4>Profile picture Privacy</h4>
                                    {user.profilePic?.isHidden === true ?
                                        <>
                                            <p>Your profile picture is currently hidden from other users.</p>
                                            <p>Show Your pictures to all</p>
                                        </>
                                        :
                                        <>
                                            <p>Your profile picture is currently visible to other users.</p>
                                            <p>Hide Your pictures from all</p>
                                        </>
                                    }


                                    <div className="modal-button-box">
                                        <button className="yes-btn" onClick={async () => {
                                            setShowOptions(false);
                                            setLoading(true);
                                            try {
                                                const res = await fetch(`${Host}/api/auth/toggle-picture-privacy`, {
                                                    method: "PUT",
                                                    headers: {
                                                        "auth-token": localStorage.getItem("token"),
                                                    },
                                                });

                                                const data = await res.json();
                                                if (res.ok) {
                                                    fetchUser();
                                                    getAccountDetails();
                                                    setShowRequestModal(false)
                                                    setLoading(false);
                                                }
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}>Yes</button>
                                        <button className="no-btn" onClick={() => setShowRequestModal(false)}>Cancle</button>
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                    {reportUser &&
                        <div className="profiledetail-overlay">
                            <div className="modal-box">
                                <h4>Report User</h4>

                                <select
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                                >
                                    <option value="">Select Reason</option>
                                    <option value="Fake profile">Fake profile</option>
                                    <option value="Harassment">Harassment</option>
                                    <option value="Inappropriate content">Inappropriate content</option>
                                    <option value="Scam / Fraud">Scam / Fraud</option>
                                    <option value="Other">Other</option>
                                </select>

                                <textarea
                                    placeholder="Additional details (optional)"
                                    value={reportDescription}
                                    onChange={(e) => setReportDescription(e.target.value)}
                                    style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                                />

                                <div className="modal-button-box">
                                    <button className="yes-btn" onClick={handleReportSubmit}>
                                        Submit Report
                                    </button>
                                    <button className="no-btn" onClick={() => setReportUser(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {deleteUser &&
                        <div className="profiledetail-overlay">
                            <div className="modal-box">
                                <h4>Delete Connection?</h4>
                                <p>You will not be able to chat with this user if connection is deleted, Are you sure want to delete connection?</p>

                                <div className="modal-button-box">
                                    <button className="yes-btn" onClick={handleDeleteConnection}>Yes</button>
                                    <button className="no-btn" onClick={() => setDeleteUser(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Modal loading={loading} />
            {requestsent &&
                <div className="chatmessage-status success">
                    <p> <Check />Sent Successful</p>
                </div>
            }
            {reportSuccess &&
                <div className="chatmessage-status success">
                    <p><Check /> Report sent successfully</p>
                </div>
            }
            {connectionNote &&
                <div className="chatmessage-status success">
                    <p><Check /> Connection removed</p>
                </div>
            }
            {contactPrivacyModal &&
                <div className="chatmessage-status success">
                    <p><Check /> {contactPrivacyError}</p>
                </div>
            }
        </div>
    );
};

export default ProfileDetail;
