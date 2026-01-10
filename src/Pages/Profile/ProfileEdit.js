import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, OctagonAlert, Pen, X } from "lucide-react";
import Picker from "react-mobile-picker";
import NoteContext from "../../Context/NikhaContext";
import Host from "../../Host/Host";
import Modal from "../../Components/Modal/Modal";

const ProfileEdit = () => {
    const { section } = useParams();
    const { userDetail, getAccountDetails } = useContext(NoteContext);
    const [imageSize, setImageSize] = useState("")
    const [profilestatus, setProfileStatus] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/app/welcome");
        } else {
            getAccountDetails();
        }
    }, [navigate]);

    const [activeSetting, setActiveSetting] = useState(null);
    const [selectedReligious, setSelectedReligious] = useState(
        userDetail.religiousDetail
    );
    const [selectedLifestyle, setSelectedLifestyle] = useState(
        userDetail.interest
    );

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState(userDetail.images || []);
    const [profilePic, setProfilePic] = useState(userDetail.profilePic?.url || "");
    const [selectedProfileFile, setSelectedProfileFile] = useState(null);
    const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);

    const [form, setForm] = useState({
        images: [],
        name: "",
        about: "",
        email: "",
        gender: "",
        dob: { day: "", month: "", year: "" },
        height: { ft: "", inch: "" },
        religion: "Muslim",
        sect: "",
        caste: "",
        maslak: "",
        state: "",
        city: "",
        maritalStatus: "",
        mobile: "",
        whatsapp: "",
        motherTongue: "",
        disability: "",
        institute: "",
        qualification: "",
        workSector: "",
        profession: "",
        income: "",
        profilePic: null,
        subscription: "",
        family: {
            location: "",
            status: "",
            type: "",
            fatherName: "",
            fatherOccupation: "",
            motherOccupation: "",
            brothers: "",
            sisters: "",
            about: "",
        },
        religiousDetail: "",
        interest: "",
    });


    useEffect(() => {
        if (userDetail) {
            setForm({
                images: userDetail.images || [],
                name: userDetail.name || "",
                about: userDetail.about || "",
                email: userDetail.email || "",

                gender: userDetail.gender || "",
                dob: userDetail.dob || { day: "", month: "", year: "" },
                height: userDetail.height || { ft: "", inch: "" },
                religion: userDetail.religion || "Muslim",
                sect: userDetail.sect || "",
                caste: userDetail.caste || "",
                maslak: userDetail.maslak || "",
                state: userDetail.state || "",
                city: userDetail.city || "",
                maritalStatus: userDetail.maritalStatus || "",
                mobile: userDetail.mobile || "",
                whatsapp: userDetail.whatsapp || "",
                motherTongue: userDetail.motherTongue || "",
                disability: userDetail.disability || "",
                qualification: userDetail.qualification || "",
                institute: userDetail.institute || "",
                workSector: userDetail.workSector || "",
                profession: userDetail.profession || "",
                income: userDetail.income || "",
                profilePic: userDetail.profilePic || null,
                subscription: userDetail.subscription?.plan || "",
                family: userDetail.family || {
                    location: "",
                    status: "",
                    type: "",
                    fatherName: "",
                    fatherOccupation: "",
                    motherOccupation: "",
                    brothers: "",
                    sisters: "",
                    about: "",
                },
                religiousDetail: selectedReligious || "",
                interest: selectedLifestyle || "",
            });
        }
    }, [userDetail]);

    const [searchTerm, setSearchTerm] = useState("");

    const courses = {
        Arts: ["B.A", "B.Ed", "B.M.C.", "B.J.M.C.", "B.M.M."],
        Commerce: ["B.Com", "B.B.A", "B.B.M"],
        Science: ["B.Sc.", "B.Pharm", "B.Tech"],
        Computer: ["B.C.A", "B.Sc. Computer Science", "B.Tech IT"],
    };

    const [professionSearch, setProfessionSearch] = useState("");

    const professions = {
        "IT & Software": [
            "Software Engineer",
            "Web Developer",
            "Data Analyst",
            "AI/ML Engineer",
        ],
        Healthcare: ["Doctor", "Nurse", "Pharmacist", "Lab Technician"],
        Education: ["Teacher", "Professor", "Counselor"],
        "Business & Finance": ["Accountant", "Manager", "Entrepreneur"],
        Creative: ["Designer", "Writer", "Photographer", "Musician"],
    };

    const religiousOptions = [
        "Recites Quran everyday",
        "Give Zakat Regularly",
        "Pray everyday",
        "Fast (Roza)",
        "Read Quran",
    ];

    const lifestyleOptions = [
        "Vegetarian",
        "Non-Vegetarian",
        "Occasional Smoker",
        "Non-Smoker",
        "Fitness Enthusiast",
    ];
    const Chip = ({ label, onRemove }) => (
        <p>
            <span>{label}</span>
            <X size={16} onClick={onRemove} className="chip-close" />
        </p>
    );

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

    // 📸 Handle Profile Image Selection + Preview
    const handleProfileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setImageSize("Profile image must be less than 1MB")
            setTimeout(() => {
                setImageSize("")
            }, 3000);
            e.target.value = ""; // reset input
            return;
        }

        // ✅ Valid file
        setSelectedProfileFile(file);
        const previewURL = URL.createObjectURL(file);
        setProfilePic(previewURL);
        setActiveSetting(null);
    };

    // 🖼 Handle Gallery Image Selection + Preview
    const handleImagesSelect = (e) => {
        const files = Array.from(e.target.files);

        // Prevent exceeding 6 total
        const totalFiles = selectedGalleryFiles.length + files.length;
        if (totalFiles > 6) {
            setImageSize("You can upload up to 6 images total!")
            setTimeout(() => {
                setImageSize("")
            }, 3000);
            return;
        }

        const invalidFile = files.find(file => file.size > MAX_FILE_SIZE);
        if (invalidFile) {
            setImageSize("Each image must be less than 1MB")
            setTimeout(() => {
                setImageSize("")
            }, 3000);
            e.target.value = ""; // reset input
            return;
        }

        // Append new files
        setSelectedGalleryFiles((prev) => [...prev, ...files]);

        // Create previews for new files and append them
        const previewURLs = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...previewURLs]);

        setActiveSetting(null); // close modal
    };

    // ❌ Remove Image Preview
    const handleRemoveImage = async (index) => {
        // console.log(index, "index")
        try {
            // instantly update UI
            setImages((prev) => prev.filter((_, i) => i !== index));
            setSelectedGalleryFiles((prev) => prev.filter((_, i) => i !== index));

            // call backend to delete image
            await fetch(`${Host}/api/auth/image/${index}`, {
                method: "DELETE",
                headers: { "auth-token": localStorage.getItem("token") },
            });
        } catch (err) {
            console.error("Error deleting image:", err);
        }
    };


    const handleAllSave = () => {
        if (section === "images") {
            handleSave()
        }
        else {
            handleSaveData()
            console.log("form data is saving")
        }
    }

    // console.log(selectedGalleryFiles, "selectedGalleryFiles")
    // 💾 Save images to backend using Fetch
    const handleSave = async () => {
        setLoading(true);
        try {
            // ✅ Upload Profile Pic
            if (selectedProfileFile) {
                const formData = new FormData();
                formData.append("profilePic", selectedProfileFile);

                const res = await fetch(`${Host}/api/auth/profile`, {
                    method: "POST",
                    headers: { "auth-token": localStorage.getItem("token") },
                    body: formData,
                });

                if (!res.ok) throw new Error("Profile upload failed");
                const data = await res.json();
                setProfilePic(data.profilePic.url);
                setProfileStatus("Images updated successfully!");
                setTimeout(() => {
                    setLoading(false);
                    setProfileStatus(null)
                    navigate(-1);
                }, 3000);
            }

            // ✅ Upload Gallery Images
            if (selectedGalleryFiles.length > 0) {
                const formData = new FormData();
                selectedGalleryFiles.forEach((file) => formData.append("images", file));

                const res = await fetch(`${Host}/api/auth/images`, {
                    method: "POST",
                    headers: { "auth-token": localStorage.getItem("token") },
                    body: formData,
                });

                if (!res.ok) throw new Error("Image upload failed");
                const data = await res.json();
                setProfileStatus("Images updated successfully!");
                setImages(data.images);
                setTimeout(() => {
                    setLoading(false);
                    setProfileStatus(null)
                    navigate(-1);
                }, 3000);
            }

        } catch (err) {
            console.error(err);
            setProfileStatus("Failed to upload images")
            setTimeout(() => {
                setLoading(false);
                setProfileStatus(null)
            }, 3000);
        }
    };

    const handleSaveData = async () => {
        setLoading(true);
        try {
            // 🔥 Merge form with religious + lifestyle selections
            const finalData = {
                ...form,
                religiousDetail: selectedReligious,
                interest: selectedLifestyle,
            };

            console.log(finalData, "finalData")

            const res = await fetch(`${Host}/api/auth/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify(finalData),
            });

            if (!res.ok) throw new Error("Update failed");

            const data = await res.json();
            setProfileStatus("Profile updated successfully!")
            setTimeout(() => {
                setLoading(false);
                setProfileStatus(null)
                navigate(-1);
            }, 3000);

        } catch (err) {
            console.error("Update error:", err);
            setProfileStatus("Failed to upload profile")
            setTimeout(() => {
                setLoading(false);
                setProfileStatus(null)
            }, 3000);
        }
    };



    return (
        <div className="Profile">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title subscription-title">
                        <ChevronLeft onClick={() => navigate(-1)} />
                        <h2>Edit {section.charAt(0).toUpperCase() + section.slice(1)}</h2>
                    </div>
                    <div className="profile-page profile-detail-modal-box profile-edit-page">
                        {section === "images" && (
                            <div>
                                <div className="profile-edit-image">
                                    <img src={
                                        profilePic ||
                                        "https://static.vecteezy.com/system/resources/previews/008/433/598/non_2x/men-icon-for-website-symbol-presentation-free-vector.jpg"
                                    } alt="" />
                                    <span
                                        onClick={() => document.getElementById("profilePicInput").click()}
                                    >
                                        <Pen />
                                        <input
                                            id="profilePicInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfileSelect}
                                            style={{
                                                display: "none",
                                            }}
                                        />
                                    </span>
                                </div>
                                {/* <h3>Edit Images</h3> */}
                                <div className="image-grid">
                                    {images.map((img, index) => (
                                        <div key={index} className="image-item">
                                            <img src={img} alt={`img-${index}`} />
                                            <X
                                                className="remove-image"
                                                onClick={() => handleRemoveImage(index)}
                                            />
                                        </div>
                                    ))}
                                    {images.length < 6 &&
                                        <div
                                            className="image-item add-image"
                                            onClick={() => document.getElementById("imagesInput").click()}
                                        >
                                            <span>+</span>
                                            <input
                                                id="imagesInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImagesSelect}
                                                style={{
                                                    display: "none", // completely hide the input
                                                }}
                                            />
                                        </div>
                                    }

                                </div>
                            </div>
                        )}
                        {section === "basic" && (
                            <div>
                                {/* <h3>Edit Basic Details</h3> */}
                                <select
                                    name="city"
                                    value={form.city} // bind value
                                    onChange={(e) => setForm({ ...form, city: e.target.value })} // update state
                                >
                                    <option value="">Select City</option>
                                    {[
                                        "Mumbai",
                                        "Pune",
                                        "Lucknow",
                                        "Delhi",
                                        "Patna",
                                        "Bengaluru",
                                    ].map((ct) => (
                                        <option key={ct} value={ct}>
                                            {ct}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="state"
                                    value={form.state}
                                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                                >
                                    <option value="">Select State</option>
                                    {[
                                        "Maharashtra",
                                        "Uttar Pradesh",
                                        "Delhi",
                                        "Karnataka",
                                        "Bihar",
                                    ].map((st) => (
                                        <option key={st} value={st}>
                                            {st}
                                        </option>
                                    ))}
                                </select>
                                <p onClick={() => setActiveSetting("sect")}>
                                    {form.sect || "Select Sect"} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("caste")}>
                                    {form.caste || "Select Caste "} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("height")}>
                                    Height:{" "}
                                    {form.height.ft && form.height.inch
                                        ? `${form.height.ft} ft ${form.height.inch} in`
                                        : "Select Height"}{" "}
                                    <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("tongue")}>
                                    {form.motherTongue || "Select Mother Tongue"} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("disability")}>
                                    {form.disability || "Select Disability"} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("maslak")}>
                                    {form.maslak || "Select Maslak"} <ChevronDown />
                                </p>
                            </div>
                        )}

                        {section === "bio" && (
                            <div>
                                {/* <h3>Edit Bio</h3> */}
                                <textarea type="text" value={form.about} placeholder="Enter bio here..."
                                    onChange={(e) =>
                                        setForm({
                                            ...form, about: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        )}
                        {section === "contact" && (
                            <div>
                                {/* <h3>Edit Contact</h3> */}
                                <input type="tel" placeholder="Phone" value={form.mobile} />
                                <input
                                    type="tel"
                                    placeholder="Whatsapp Number"
                                    value={form.whatsapp}
                                />
                            </div>
                        )}
                        {section === "education" && (
                            <div>
                                <p onClick={() => setActiveSetting("cource")}>
                                    Qualification: {form.qualification || "Select"}{" "}
                                    <ChevronDown />
                                </p>
                                <input
                                    type="text"
                                    placeholder="College or Univercity"
                                    value={form.institute}
                                />
                                <p onClick={() => setActiveSetting("profession")}>
                                    {form.profession || "Select Profession"} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("sector")}>
                                    {form.workSector || "Select Sector"} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("salary")}>
                                    {form.income || "Select Income"} <ChevronDown />
                                </p>
                            </div>
                        )}
                        {section === "family" && (
                            <div>
                                {/* <h3>Edit Family</h3> */}
                                <input
                                    type="text"
                                    placeholder="Family Lives in "
                                    value={form.family.location}
                                />
                                <p onClick={() => setActiveSetting("familystatus")}>
                                    {form.family.status || "Select Family Status"} <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("familytype")}>
                                    {form.family.type || "Select Family Type"} <ChevronDown />
                                </p>
                                <input
                                    type="text"
                                    placeholder="Father's Name"
                                    value={form.family.fatherName}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            family: { ...form.family, fatherName: e.target.value },
                                        })
                                    }
                                />
                                <p onClick={() => setActiveSetting("Fatheroccupation")}>
                                    {form.family.fatherOccupation || "Select Father's Occupation"}{" "}
                                    <ChevronDown />
                                </p>
                                <p onClick={() => setActiveSetting("motheroccupation")}>
                                    {form.family.motherOccupation || "Select Mother's Occupation"}{" "}
                                    <ChevronDown />
                                </p>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input
                                        type="number"
                                        placeholder="No. of Brother's"
                                        value={form.family.brothers}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                family: { ...form.family, brothers: e.target.value },
                                            })
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="No. of Sister's"
                                        value={form.family.sisters}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                family: { ...form.family, sisters: e.target.value },
                                            })
                                        }
                                    />
                                </div>
                                <textarea
                                    type="text"
                                    placeholder="About Family"
                                    value={form.family.about}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            family: { ...form.family, about: e.target.value },
                                        })
                                    }
                                />
                            </div>
                        )}
                        {section === "religious" && (
                            <div>
                                {/* Selected items */}
                                <div className="chip-container lifestyle-card">
                                    {selectedReligious.map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            onRemove={() =>
                                                setSelectedReligious(
                                                    selectedReligious.filter((i) => i !== item)
                                                )
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Available items */}
                                <div className="available-items lifestyle-card">
                                    {religiousOptions
                                        .filter((item) => !selectedReligious.includes(item))
                                        .map((item) => (
                                            <p
                                                key={item}
                                                className="option-btn"
                                                onClick={() =>
                                                    setSelectedReligious([...selectedReligious, item])
                                                }
                                            >
                                                {item}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )}
                        {section === "lifestyle" && (
                            <div>
                                {/* Selected items */}
                                <div className="chip-container lifestyle-card">
                                    {selectedLifestyle.map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            onRemove={() =>
                                                setSelectedLifestyle(
                                                    selectedLifestyle.filter((i) => i !== item)
                                                )
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Available items */}
                                <div className="available-items lifestyle-card">
                                    {lifestyleOptions
                                        .filter((item) => !selectedLifestyle.includes(item))
                                        .map((item) => (
                                            <p
                                                key={item}
                                                className="option-btn"
                                                onClick={() =>
                                                    setSelectedLifestyle([...selectedLifestyle, item])
                                                }
                                            >
                                                {item}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Repeat for contact, education, family, religious, lifestyle */}

                        <button onClick={handleAllSave}>Save</button>
                    </div>
                </div>
            </div>
            <div
                className={`profile-modal profiledetail ${activeSetting ? "active" : ""
                    }`}
            >
                <div
                    className="close-profile-modal"
                    onClick={() => setActiveSetting(null)}
                >
                    <X />
                </div>
                <div className="profile-detail-modal">
                    <div className=" profile-edit-page">
                        {activeSetting === "sect" && (
                            <div>
                                <h2>Sect</h2>
                                <div className="radio-group Sect-group">
                                    {["Sunni", "Shia", "Other"].map((sect) => (
                                        <label key={sect} className="radio-option">
                                            <span>{sect}</span>
                                            <input
                                                type="radio"
                                                name="sect"
                                                value={sect}
                                                checked={form.sect === sect}
                                                onChange={(e) => {
                                                    setForm({ ...form, sect: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "caste" && (
                            <div>
                                <h2>Caste</h2>
                                <div className="radio-group">
                                    {[
                                        "Syed",
                                        "Sheikh",
                                        "Pathan",
                                        "Ansari",
                                        "Qureshi",
                                        "Other",
                                    ].map((option) => (
                                        <label key={option} className="radio-option">
                                            <span>{option}</span>
                                            <input
                                                type="radio"
                                                name="caste"
                                                value={option}
                                                checked={form.caste === option}
                                                onChange={(e) => {
                                                    setForm({ ...form, caste: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "height" && (
                            <div>
                                <h2>Height</h2>
                                <div className="dob-picker">
                                    <Picker
                                        value={form.height}
                                        onChange={(val) => setForm({ ...form, height: val })}
                                    >
                                        <Picker.Column name="ft">
                                            {[...Array(10)].map((_, i) => (
                                                <Picker.Item key={i + 1} value={i + 1}>
                                                    {i + 1} ft
                                                </Picker.Item>
                                            ))}
                                        </Picker.Column>
                                        <Picker.Column name="inch">
                                            {[...Array(11)].map((_, i) => (
                                                <Picker.Item key={i + 1} value={i + 1}>
                                                    {i + 1} in
                                                </Picker.Item>
                                            ))}
                                        </Picker.Column>
                                    </Picker>
                                </div>
                                {form.height.ft && form.height.inch && (
                                    <p className="age-display">
                                        You are {form.height.ft} ft {form.height.inch} in tall
                                    </p>
                                )}
                            </div>
                        )}
                        {activeSetting === "tongue" && (
                            <div>
                                <h2>Mother Tongue</h2>
                                <div className="radio-group">
                                    {["Hindi/Urdu", "Angika", "Arabic", "Arunachali"].map(
                                        (status) => (
                                            <label key={status} className="radio-option">
                                                <span>{status}</span>
                                                <input
                                                    type="radio"
                                                    name="motherTongue"
                                                    value={status}
                                                    checked={form.motherTongue === status}
                                                    onChange={(e) => {
                                                        setForm({ ...form, motherTongue: e.target.value });
                                                    }}
                                                />
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeSetting === "disability" && (
                            <div>
                                <h2>Any Disability</h2>
                                <div className="radio-group">
                                    {["Yes", "No"].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="disability"
                                                value={status}
                                                checked={form.disability === status}
                                                onChange={(e) => {
                                                    setForm({ ...form, disability: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSetting === "maslak" && (
                            <div>
                                <h2>Maslak(Optional)</h2>
                                <div className="radio-group">
                                    {[
                                        "No Maslak",
                                        "Ahle Hadees",
                                        "Barelvi",
                                        "Deobandi",
                                        "Sufi",
                                        "Tablighi Jamaat",
                                        "Others",
                                    ].map((m) => (
                                        <label key={m} className="radio-option">
                                            <span>{m}</span>
                                            <input
                                                type="radio"
                                                name="maslak"
                                                value={m}
                                                checked={form.maslak === m}
                                                onChange={(e) => {
                                                    setForm({ ...form, maslak: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "cource" && (
                            <div>
                                <h2>Highest qualification</h2>

                                {/* Search Bar */}
                                <input
                                    type="text"
                                    placeholder="Search course..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                    style={{
                                        marginBottom: "15px",
                                        padding: "8px",
                                        width: "100%",
                                    }}
                                />

                                {/* Course Lists */}
                                <div className="radio-group qualifucation-group">
                                    {Object.entries(courses).map(([stream, streamCourses]) => {
                                        // Filter courses based on search
                                        const filteredCourses = streamCourses.filter((course) =>
                                            course.toLowerCase().includes(searchTerm.toLowerCase())
                                        );

                                        if (filteredCourses.length === 0) return null;

                                        return (
                                            <div key={stream} style={{ marginBottom: "15px" }}>
                                                <h4>{stream}</h4>
                                                {filteredCourses.map((course) => (
                                                    <label key={course} className="radio-option">
                                                        <span>{course}</span>
                                                        <input
                                                            type="radio"
                                                            name="qualification"
                                                            value={course}
                                                            checked={form.qualification === course}
                                                            onChange={(e) => {
                                                                setForm({
                                                                    ...form,
                                                                    qualification: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </label>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {activeSetting === "profession" && (
                            <div>
                                <h2>Profession?</h2>

                                {/* Search Bar */}
                                <input
                                    type="text"
                                    placeholder="Search profession..."
                                    value={professionSearch}
                                    onChange={(e) => setProfessionSearch(e.target.value)}
                                    className="search-input"
                                    style={{
                                        marginBottom: "15px",
                                        padding: "8px",
                                        width: "100%",
                                    }}
                                />

                                {/* Profession List */}
                                <div className="radio-group qualifucation-group">
                                    {Object.entries(professions).map(
                                        ([category, categoryProfessions]) => {
                                            const filteredProfessions = categoryProfessions.filter(
                                                (prof) =>
                                                    prof
                                                        .toLowerCase()
                                                        .includes(professionSearch.toLowerCase())
                                            );

                                            if (filteredProfessions.length === 0) return null;

                                            return (
                                                <div key={category} style={{ marginBottom: "15px" }}>
                                                    <h4>{category}</h4>
                                                    {filteredProfessions.map((prof) => (
                                                        <label key={prof} className="radio-option">
                                                            <span>{prof}</span>
                                                            <input
                                                                type="radio"
                                                                name="profession"
                                                                value={prof}
                                                                checked={form.profession === prof}
                                                                onChange={(e) => {
                                                                    setForm({
                                                                        ...form,
                                                                        profession: e.target.value,
                                                                    });
                                                                }}
                                                            />
                                                        </label>
                                                    ))}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                        {activeSetting === "sector" && (
                            <div>
                                <h2>Sector you work in?</h2>
                                <div className="radio-group">
                                    {[
                                        "Business/Self Employed",
                                        "Civil Services",
                                        "Defence",
                                        "Government/Public Sector",
                                        "Private Sector",
                                        "Not Working",
                                    ].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="workSector"
                                                value={status}
                                                checked={form.workSector === status}
                                                onChange={(e) => {
                                                    setForm({ ...form, workSector: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "salary" && (
                            <div>
                                <h2>Annual income</h2>
                                <div className="dob-picker">
                                    <Picker
                                        value={{ income: form.income }}
                                        onChange={(val) => setForm({ ...form, income: val.income })}
                                    >
                                        <Picker.Column name="income">
                                            {[
                                                "Below 2 Lakh",
                                                "2–5 Lakh",
                                                "5–10 Lakh",
                                                "10–20 Lakh",
                                                "20+ Lakh",
                                            ].map((opt) => (
                                                <Picker.Item key={opt} value={opt}>
                                                    {opt}
                                                </Picker.Item>
                                            ))}
                                        </Picker.Column>
                                    </Picker>
                                </div>
                            </div>
                        )}
                        {activeSetting === "familystatus" && (
                            <div>
                                <h2>Family Status</h2>
                                <div className="radio-group">
                                    {[
                                        "Middle Class",
                                        "Upper Middle Class",
                                        "Rich",
                                        "Affluent",
                                    ].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="familyStatus"
                                                value={status}
                                                checked={form.family.status === status}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        family: { ...form.family, status: e.target.value },
                                                    })
                                                }
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "familytype" && (
                            <div>
                                <h2>Family Type</h2>
                                <div className="radio-group">
                                    {["Joint", "Nuclear"].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="familyType"
                                                value={status}
                                                checked={form.family.type === status}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        family: { ...form.family, type: e.target.value },
                                                    })
                                                }
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "Fatheroccupation" && (
                            <div>
                                <h2>Father's Occupation</h2>
                                <div className="radio-group">
                                    {[
                                        "Private Job",
                                        "Government Job",
                                        "Business",
                                        "Retired",
                                        "Other",
                                    ].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="fatherOccupation"
                                                value={status}
                                                checked={form.family.fatherOccupation === status}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        family: {
                                                            ...form.family,
                                                            fatherOccupation: e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "motheroccupation" && (
                            <div>
                                <h2>Mother's Occupation</h2>
                                <div className="radio-group">
                                    {["Housewife", "Working", "Retired", "Other"].map(
                                        (status) => (
                                            <label key={status} className="radio-option">
                                                <span>{status}</span>
                                                <input
                                                    type="radio"
                                                    name="motherOccupation"
                                                    value={status}
                                                    checked={form.family.motherOccupation === status}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            family: {
                                                                ...form.family,
                                                                motherOccupation: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal loading={loading} profilestatus={profilestatus} />
            {imageSize &&
                <div className="chatmessage-status fail">
                    <p> <OctagonAlert /> {imageSize}</p>
                </div>
            }
        </div>
    );
};

export default ProfileEdit;
