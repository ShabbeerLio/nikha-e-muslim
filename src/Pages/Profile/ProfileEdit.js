import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import Picker from "react-mobile-picker";

const ProfileEdit = () => {
    const { section } = useParams();
    const navigate = useNavigate();

    const [activeSetting, setActiveSetting] = useState(null);

    const [form, setForm] = useState({
        profileFor: "",
        name: "",
        email: "",
        password: "",
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
        motherTongue: "",
        disability: "",
        qualification: "",
        workSector: "",
        profession: "",
        income: "",
        profilePic: null,
        subscription: "",
    });

    const [searchTerm, setSearchTerm] = useState("");

    const courses = {
        Arts: ["B.A", "B.Ed", "B.M.C.", "B.J.M.C.", "B.M.M."],
        Commerce: ["B.Com", "B.B.A", "B.B.M"],
        Science: ["B.Sc.", "B.Pharm", "B.Tech"],
        Computer: ["B.C.A", "B.Sc. Computer Science", "B.Tech IT"]
    };


    const [professionSearch, setProfessionSearch] = useState("");

    const professions = {
        "IT & Software": ["Software Engineer", "Web Developer", "Data Analyst", "AI/ML Engineer"],
        "Healthcare": ["Doctor", "Nurse", "Pharmacist", "Lab Technician"],
        "Education": ["Teacher", "Professor", "Counselor"],
        "Business & Finance": ["Accountant", "Manager", "Entrepreneur"],
        "Creative": ["Designer", "Writer", "Photographer", "Musician"],
    };

    const calculateAge = (day, month, year) => {
        if (!day || !month || !year) return "";

        const monthIndex = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

    const [selectedReligious, setSelectedReligious] = useState([]);
    const [selectedLifestyle, setSelectedLifestyle] = useState([]);

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

    return (
        <div className="Profile">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title subscription-title">
                        <ChevronLeft onClick={() => navigate(-1)} />
                        <h2>Edit {section.charAt(0).toUpperCase() + section.slice(1)}</h2>
                    </div>
                    <div className="profile-page profile-detail-modal-box profile-edit-page">
                        {section === "basic" && (
                            <div>
                                {/* <h3>Edit Basic Details</h3> */}
                                <select name="city">
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
                                <select name="state">
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
                                <p onClick={() => setActiveSetting("sect")} >Select Sect <ChevronDown /></p>
                                <p onClick={() => setActiveSetting("caste")} >Select Caste <ChevronDown /></p>
                                <p onClick={() => setActiveSetting("height")} >Height<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("tongue")} >Mother Tongue<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("disability")} >Any Disability<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("maslak")} >Maslak(Optional)<ChevronDown /></p>
                            </div>
                        )}

                        {section === "bio" && (
                            <div>
                                {/* <h3>Edit Bio</h3> */}
                                <textarea placeholder="Enter bio here..." />
                            </div>
                        )}
                        {section === "contact" && (
                            <div>
                                {/* <h3>Edit Contact</h3> */}
                                <input type="tel" placeholder="Phone" />
                            </div>
                        )}
                        {section === "education" && (
                            <div>
                                <p onClick={() => setActiveSetting("cource")} >Cource<ChevronDown /></p>
                                <input type="text" placeholder="College" />
                                <p onClick={() => setActiveSetting("profession")} >Profession<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("sector")} >Sector<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("salary")} >Salary<ChevronDown /></p>
                            </div>
                        )}
                        {section === "family" && (
                            <div>
                                {/* <h3>Edit Family</h3> */}
                                <input type="text" placeholder="Family Lives in " />
                                <p onClick={() => setActiveSetting("familystatus")} >Family Status<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("familytype")} >Family Type<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("familynative")} >Native State<ChevronDown /></p>
                                <input type="text" placeholder="Father's Name" />
                                <p onClick={() => setActiveSetting("Fatheroccupation")} >Father's Occupation<ChevronDown /></p>
                                <p onClick={() => setActiveSetting("motheroccupation")} >Mother's Occupation<ChevronDown /></p>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input type="number" placeholder="No. of Brother's" />
                                    <input type="number" placeholder="No. of Sister's" />
                                </div>
                                <textarea type="text" placeholder="About Family" />
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
                                                setSelectedReligious(selectedReligious.filter((i) => i !== item))
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
                                                onClick={() => setSelectedReligious([...selectedReligious, item])}
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
                                                setSelectedLifestyle(selectedLifestyle.filter((i) => i !== item))
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
                                                onClick={() => setSelectedLifestyle([...selectedLifestyle, item])}
                                            >
                                                {item}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Repeat for contact, education, family, religious, lifestyle */}

                        <button onClick={() => navigate(-1)}>Save</button>
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
                                    {["Syed", "Sheikh", "Pathan", "Ansari", "Qureshi", "Other"].map((option) => (
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
                                    {["Hindi/Urdu", "Angika", "Arabic", "Arunachali"].map((status) => (
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
                                    ))}
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
                                    {["No Maslak", "Ahle Hadees", "Barelvi", "Deobandi", "Sufi", "Tablighi Jamaat", "Others"].map((m) => (
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
                                    style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
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
                                                                setForm({ ...form, qualification: e.target.value });
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
                                    style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
                                />

                                {/* Profession List */}
                                <div className="radio-group qualifucation-group">
                                    {Object.entries(professions).map(([category, categoryProfessions]) => {
                                        const filteredProfessions = categoryProfessions.filter((prof) =>
                                            prof.toLowerCase().includes(professionSearch.toLowerCase())
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
                                                                setForm({ ...form, profession: e.target.value });
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
                        {activeSetting === "sector" && (
                            <div>
                                <h2>Sector you work in?</h2>
                                <div className="radio-group">
                                    {["Business/Self Employed", "Civil Services", "Defence", "Government/Public Sector", "Private Sector", "Not Working"].map((status) => (
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
                                    {["Middle Class", "Upper Middle Class", "Rich", "Affluent"].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="familyStatus"
                                                value={status}
                                                checked={form.familyStatus === status}
                                                onChange={(e) => {
                                                    setForm({ ...form, familyStatus: e.target.value });
                                                }}
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
                                                checked={form.familyType === status}
                                                onChange={(e) => {
                                                    setForm({ ...form, familyType: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeSetting === "familynative" && (
                            <div>
                                <h2>Native State</h2>
                                <div className="radio-group">
                                    {["Maharashtra", "Uttar Pradesh", "Delhi", "Karnataka", "Bihar"].map((st) => (
                                        <label key={st} className="radio-option">
                                            <span>{st}</span>
                                            <input
                                                type="radio"
                                                name="familyNative"
                                                value={st}
                                                checked={form.familyNative === st}
                                                onChange={(e) => {
                                                    setForm({ ...form, familyNative: e.target.value });
                                                }}
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
                                    {["Private Job", "Government Job", "Business", "Retired", "Other"].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="fatherOccupation"
                                                value={status}
                                                checked={form.fatherOccupation === status}
                                                onChange={(e) => {
                                                    setForm({ ...form, fatherOccupation: e.target.value });
                                                }}
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
                                    {["Housewife", "Working", "Retired", "Other"].map((status) => (
                                        <label key={status} className="radio-option">
                                            <span>{status}</span>
                                            <input
                                                type="radio"
                                                name="motherOccupation"
                                                value={status}
                                                checked={form.motherOccupation === status}
                                                onChange={(e) => {
                                                    setForm({ ...form, motherOccupation: e.target.value });
                                                }}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
