import React, { useEffect, useRef, useState } from "react";
import "./ProfileDetail.css";
import { BriefcaseBusiness, CheckCheck, ChevronLeft, EllipsisVertical, GraduationCap, Heart, ImagePlus, Images, Languages, Lock, Mail, MapPinHouse, MessageCircle, MessageCircleHeart, MoonStar, Pen, Phone, Ruler, ScanHeart, Star, Timer, User, UserPen, UserRoundPlus, WalletMinimal, X } from "lucide-react";
import Users from "../../Users"; // adjust path if needed
import { useNavigate, useParams } from "react-router-dom";
import profileData from "../../Profile"
import { MdFamilyRestroom } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";



const ProfileDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = Users.find((u) => u.id.toString() === id);
    const personal = id === profileData.id;
    console.log(personal, "personal")
    const [subscriptionPlan, setSubscriptionPlan] = useState(profileData.subscriptionPlan || "free");

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

    const religiousOptions = [
        "Recites Quran everyday",
        "Give Zakat Regularly",
        "Pray everyday",
        "Fast (Roza)",
        "Read Quran",
    ];

    const lifestyleOptions = [
        "Non-Vegetarian",
        "Occasional Smoker",
        "Non-Smoker",
        "Fitness Enthusiast",
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [
      "https://cdn.pixabay.com/photo/2024/02/16/05/34/ai-generated-8576689_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/04/19/05/11/portrait-3332334_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/07/16/05/49/girl-5409762_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/08/18/15/59/woman-6555932_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/04/01/14/51/hijab-4991433_1280.jpg"
];

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
                            <img src={user.img} alt="" />
                            {personal ? <ImagePlus onClick={() => navigate(`/profile-edit/images`)} /> : <Images onClick={() => setIsModalOpen(true)} />}

                        </div>
                        <h2>
                            {user.name}
                        </h2>
                        <p>
                            Delhi
                        </p>
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
                        <div className="profile-detail-bottom-box">
                            <h2>Matched</h2>
                            <ul>
                                <li><MapPinHouse /> Delhi <CheckCheck className="matched" /></li>
                                <li> <Languages /> Hindi / Urdu <CheckCheck className="matched" /></li>
                                <li><MoonStar />Sunni <CheckCheck className="matched" /></li>
                                <li><MoonStar />Pathan <CheckCheck className="matched" /></li>
                                <li><MoonStar />Barelvi <CheckCheck className="matched" /></li>
                                <li><MoonStar />Fitness Enthusiast <CheckCheck className="matched" /></li>
                                <li><MoonStar />Non-Vegetarian  <CheckCheck className="matched" /></li>
                            </ul>
                            <p style={{ color: "green" }}>Your profile matched 60%</p>
                        </div>
                        <section id="basic" ref={sectionRefs.basic}>
                            <div className="profile-detail-bottom-box">
                                <h2>Basic Details {personal && <Pen onClick={() => navigate(`/profile-edit/basic`)} />}</h2>
                                <ul>
                                    <li><ScanHeart />Single</li>
                                    <li> <Ruler /> 5ft 11in</li>
                                    <li><MapPinHouse /> Delhi</li>
                                    <li> <Languages /> Hindi / Urdu</li>
                                    <li><MoonStar />Sunni, Pathan, Barelvi</li>
                                    <li><UserPen />Profile created for Self</li>
                                </ul>
                            </div>
                            <div className="profile-detail-bottom-box">
                                <h2>{user.name}'s Bio {personal && <Pen onClick={() => navigate(`/profile-edit/bio`)} />}</h2>
                                <p>
                                    {showFullBio
                                        ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit."
                                        : truncateWords(
                                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ullam laudantium tempora ipsum commodi expedita sit.",
                                            20
                                        )}
                                    <span className="view-more-btn"
                                        onClick={() => setShowFullBio(!showFullBio)}>{showFullBio ? "View Less" : "View More"}</span>
                                </p>
                            </div>
                        </section>

                        <section className="profile-detail-bottom-box" id="contact" ref={sectionRefs.contact}>
                            <h2>Contact {personal && <Pen onClick={() => navigate(`/profile-edit/contact`)} />}</h2>
                            {subscriptionPlan === "free" && !personal ? (
                                <div className="contact-overlay">
                                    <div className="contact-overlay-content">
                                        <Lock />
                                        <h5>Upgrade to Premium to view contact details</h5>
                                    </div>
                                    <button onClick={() => navigate("/subscription")}>Upgrade Now</button>
                                </div>
                            ) :
                                (<>
                                    <p><MapPinHouse /> Delhi, India</p>
                                    <p><Mail /> test@example.com</p>
                                    <p><Phone /> +91-9876543210</p>
                                    <p style={{ color: "green" }}><FaWhatsapp style={{ color: "green" }} /> +91-9876543210</p>
                                </>)}

                        </section>

                        <section className="profile-detail-bottom-box" id="education" ref={sectionRefs.education}>
                            <h2>Education & Career {personal && <Pen onClick={() => navigate(`/profile-edit/education`)} />}</h2>
                            <div className="profile-detail-bottom-card">
                                <GraduationCap />
                                <div className="profiledetail-card-detail">
                                    <h6>B.C.A</h6>
                                    <p>XYZ Univercity of Technology</p>
                                </div>
                            </div>
                            <div className="profile-detail-bottom-card">
                                <BriefcaseBusiness />
                                <div className="profiledetail-card-detail">
                                    <h6>MERN Stack Developer</h6>
                                    <p>Private Sector</p>
                                </div>
                            </div>
                            <div className="profile-detail-bottom-card">
                                <WalletMinimal />
                                <div className="profiledetail-card-detail">
                                    <h6>Rs. 5 - 6 Lakh</h6>
                                    <p>Annual Income</p>
                                </div>
                            </div>
                        </section>

                        <section className="profile-detail-bottom-box" id="family" ref={sectionRefs.family}>
                            <h2>Family {personal && <Pen onClick={() => navigate(`/profile-edit/family`)} />}</h2>
                            <div className="profile-detail-bottom-card">
                                <MdFamilyRestroom />
                                <div className="profiledetail-card-detail">
                                    <h6>Family Lives in</h6>
                                    <p>Delhi</p>
                                    <h6>Family Status</h6>
                                    <p>-</p>
                                    <h6>Family Type</h6>
                                    <p>-</p>
                                </div>
                            </div>
                            <div className="profile-detail-bottom-card">
                                <UserRoundPlus />
                                <div className="profiledetail-card-detail">
                                    <h6>Father's Name</h6>
                                    <p>-</p>
                                    <h6>Mother's Occupation</h6>
                                    <p>-</p>
                                    <h6>No. of brothers</h6>
                                    <p>-</p>
                                    <h6>No. of sisters</h6>
                                    <p>-</p>
                                    <h6>About Family</h6>
                                    <p>-</p>
                                </div>
                            </div>
                        </section>

                        <section className="profile-detail-bottom-box" id="religious" ref={sectionRefs.religious}>
                            <h2>Religious Detail {personal && <Pen onClick={() => navigate(`/profile-edit/religious`)} />}</h2>
                            {subscriptionPlan === "free" && !personal ? (
                                <div className="contact-overlay">
                                    <div className="contact-overlay-content">
                                        <Lock />
                                        <h5>Upgrade to Premium to view contact details</h5>
                                    </div>
                                    <button onClick={() => navigate("/subscription")}>Upgrade Now</button>
                                </div>
                            ) : (
                                <div className="profile-detail-bottom-card ">
                                    <div className="lifestyle-card">
                                        {religiousOptions.map((item) => (
                                            <p key={item}>{item}</p>
                                        ))}
                                    </div>
                                </div>)}
                        </section>

                        <section className="profile-detail-bottom-box" id="lifestyle" ref={sectionRefs.lifestyle}>
                            <h2>Lifestyle & Interest {personal && <Pen onClick={() => navigate(`/profile-edit/lifestyle`)} />}</h2>
                            {subscriptionPlan === "free" && !personal ? (
                                <div className="contact-overlay">
                                    <div className="contact-overlay-content">
                                        <Lock />
                                        <h5>Upgrade to Premium to view contact details</h5>
                                    </div>
                                    <button onClick={() => navigate("/subscription")}>Upgrade Now</button>
                                </div>
                            ) : (
                                <div className="profile-detail-bottom-card">
                                    <div className="lifestyle-card">
                                        {lifestyleOptions.map((item) => (
                                            <p key={item}>{item}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </section>
                    </div>
                    {!personal && (
                        <div className="profiledetail-chat">
                            {user?.wishlist ? (
                                <p><Heart style={{ fill: "pink" }} /> Wishlisted</p>
                            ) : (
                                <p><Heart /> Wishlist</p>
                            )}

                            {user?.status === "interested" ? (
                                <p className={`${user?.status}`} onClick={() => navigate(`/chat/${user.id}`)}><MessageCircle />Chat</p>
                            ) : user?.status === "pending" ? (
                                <p><Timer />Pending</p>
                            ) : (
                                <p><Star />Interested</p>
                            )}
                        </div>
                    )}
                    {/* Modal */}
      {isModalOpen && (
        <div className="image-modal">
          <div className="image-modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>

            {/* Full Screen Image */}
            <div className="full-image">
              <img
                src={images[selectedIndex]}
                alt={`Gallery ${selectedIndex}`}
              />
            </div>

            {/* Image Tabs */}
            <div className="image-tabs">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`thumbnail ${
                    index === selectedIndex ? "active" : ""
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
