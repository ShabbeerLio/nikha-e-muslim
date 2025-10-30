import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProfileDetail.css";
import {
    BriefcaseBusiness,
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

const ProfileDetail = () => {
    const { userDetail, getAccountDetails } = useContext(NoteContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [matchedItems, setMatchedItems] = useState()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/welcome");
        } else {
            getAccountDetails();
        }
    }, [navigate]);

    useEffect(() => {
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
            } catch (error) {
                console.error(error);
            }
        };
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
        userDetail.subscription?.plan || "free"
    );

    // console.log(userDetail,"userDetail")

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

    const galleryImages = user.images || [];

    // console.log(user, "user");
    const sendInderest = async (receiverId) => {
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
            } else {
                console.error("Error sending interest:", data.error);
            }
        } catch (error) {
            console.error("Error sending interest:", error);
        }
    };

    const handleWishlist = async (userId) => {
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
            } else {
                console.error("Error updating wishlist:", data.error);
            }
        } catch (error) { console.error("Error updating wishlist:", error); }
    };
    const handleRemoveWishlist = async (userId) => {
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
            } else {
                console.error("Error updating wishlist:", data.error);
            }
        } catch (error) { console.error("Error updating wishlist:", error); }
    };


    // console.log(userDetail, "userDetail")

    return (
        <div className="Profile-detail">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title">
                        <ChevronLeft onClick={() => navigate(-1)} />
                        <h2>Profile Detail</h2>
                        <EllipsisVertical />
                    </div>
                    <div className="profile-detail-top">
                        <div className="profile-detail-top-image">
                            <img
                                src={
                                    user?.profilePic?.url
                                        ? user?.profilePic?.url
                                        : "https://static.vecteezy.com/system/resources/previews/068/013/243/large_2x/muslim-male-character-free-vector.jpg"
                                }
                                alt="profile"
                            />
                            {personal ? (
                                <ImagePlus onClick={() => navigate(`/profile-edit/images`)} />
                            ) : (
                                <Images onClick={() => setIsModalOpen(true)} />
                            )}
                        </div>
                        <h2>{user?.name || "-"}</h2>
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
                        {!personal && (
                            <div className="profile-detail-bottom-box">
                                <h2>Matched</h2>
                                <ul>
                                    {matchedItems?.matchedFields.map((field, i) => (
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
                                        <Pen onClick={() => navigate(`/profile-edit/basic`)} />
                                    )}
                                </h2>
                                <ul>
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
                                        <Pen onClick={() => navigate(`/profile-edit/bio`)} />
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
                                    <Pen onClick={() => navigate(`/profile-edit/contact`)} />
                                )}
                            </h2>
                            {subscriptionPlan === "free" && !personal ? (
                                <div className="contact-overlay">
                                    <div className="contact-overlay-content">
                                        <Lock />
                                        <h5>Upgrade to Premium to view contact details</h5>
                                    </div>
                                    <button onClick={() => navigate("/subscription")}>
                                        Upgrade Now
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
                                        <FaWhatsapp style={{ color: "green" }} /> {user?.whatsapp || "Not Added"}
                                    </p>
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
                                    <Pen onClick={() => navigate(`/profile-edit/education`)} />
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
                                    <Pen onClick={() => navigate(`/profile-edit/family`)} />
                                )}
                            </h2>
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
                        </section>

                        <section
                            className="profile-detail-bottom-box"
                            id="religious"
                            ref={sectionRefs.religious}
                        >
                            <h2>
                                Religious Detail{" "}
                                {personal && (
                                    <Pen onClick={() => navigate(`/profile-edit/religious`)} />
                                )}
                            </h2>
                            {subscriptionPlan === "free" && !personal ? (
                                <div className="contact-overlay">
                                    <div className="contact-overlay-content">
                                        <Lock />
                                        <h5>Upgrade to Premium to view contact details</h5>
                                    </div>
                                    <button onClick={() => navigate("/subscription")}>
                                        Upgrade Now
                                    </button>
                                </div>
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
                                    <Pen onClick={() => navigate(`/profile-edit/lifestyle`)} />
                                )}
                            </h2>
                            {subscriptionPlan === "free" && !personal ? (
                                <div className="contact-overlay">
                                    <div className="contact-overlay-content">
                                        <Lock />
                                        <h5>Upgrade to Premium to view contact details</h5>
                                    </div>
                                    <button onClick={() => navigate("/subscription")}>
                                        Upgrade Now
                                    </button>
                                </div>
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
                                    onClick={() => navigate(`/chat/${user._id}`)}
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
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
