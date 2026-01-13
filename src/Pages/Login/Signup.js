import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X, Eye, EyeOff } from "lucide-react";
import male from "../../Assets/male.png";
import female from "../../Assets/female.png";
import Picker from "react-mobile-picker";
import Host from "../../Host/Host";
import logo from "../../Assets/Logo/logo.png";

const steps = [
  "Account Info",
  "OTP Verification",
  "Profile For",
  "Gender",
  "Date of Birth",
  "Height",
  "Religion & Sect",
  "Caste",
  "Maslak",
  "Location",
  "Parents Location",
  "Marital Status",
  "Mobile Number",
  "Mother Tongue",
  "Qualification",
  "Work Sector",
  "Profession",
  "Annual Income",
  "Profile Picture",
  "Subscription",
  "Finish",
];

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [profileSize, setProfileSize] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  const stepValidation = {
    0: ["name", "email", "password"],
    1: ["otp"],
    2: ["profileFor"],
    3: ["gender"],
    4: ["dob"],
    5: ["height"],
    6: ["sect"],
    7: ["caste"],
    8: ["maslak"],
    9: ["state", "city"],
    10: ["familyLivesHere"],
    11: ["maritalStatus"],
    12: ["mobile"],
    13: ["motherTongue"],
    14: ["qualification"],
    15: ["workSector"],
    16: ["profession"],
    17: ["income"],
  };

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
    qualification: "",
    workSector: "",
    profession: "",
    income: "",
    profilePic: null,
    subscription: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

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
  // State and course data
  const [searchTerm, setSearchTerm] = React.useState("");

  const courses = {
    Others: [
      "Un-Educated",
      "Primary",
      "Secondary",
      "Higher Secondary",
      "Diploma",
      "ITI",
      "Vocational Training",
    ],

    Arts: [
      "B.A",
      "B.Ed",
      "B.M.C",
      "B.J.M.C",
      "B.M.M",
      "M.A",
      "M.Ed",
      "BFA",
      "MFA",
      "BA (Honours)",
      "MA (Honours)",
    ],

    Commerce: [
      "B.Com",
      "B.Com (Honours)",
      "M.Com",
      "B.B.A",
      "B.B.M",
      "MBA",
      "CA",
      "CS",
      "CMA",
      "Diploma in Accounting",
      "Chartered Accountant (CA Inter)",
    ],

    Science: [
      "B.Sc",
      "B.Sc (Honours)",
      "M.Sc",
      "B.Pharm",
      "M.Pharm",
      "B.Tech",
      "M.Tech",
      "B.E",
      "M.E",
      "MBBS",
      "BDS",
      "BHMS",
      "BAMS",
      "BNYS",
      "Nursing (GNM)",
      "B.Sc Nursing",
    ],

    Computer: [
      "B.C.A",
      "M.C.A",
      "B.Sc Computer Science",
      "M.Sc Computer Science",
      "B.Tech IT",
      "B.Tech CSE",
      "M.Tech CSE",
      "Diploma in Computer Applications (DCA)",
      "PGDCA",
      "Software Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Cyber Security",
      "Cloud Computing",
    ],

    Law: ["LLB", "BA LLB", "BBA LLB", "LLM", "Diploma in Law"],

    Education: ["D.El.Ed", "B.Ed", "M.Ed", "Diploma in Teaching", "NTT", "TTC"],

    Engineering: [
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Electronics Engineering",
      "Chemical Engineering",
      "Automobile Engineering",
      "Aerospace Engineering",
    ],

    Medical: ["MBBS", "BDS", "BAMS", "BHMS", "BUMS", "MD", "MS", "DM", "MCh"],

    Management: [
      "MBA",
      "PGDM",
      "Hotel Management",
      "Hospital Management",
      "Event Management",
      "Retail Management",
    ],

    IslamicStudies: [
      "Hifz-e-Quran",
      "Alim Course",
      "Fazilat",
      "Mufti Course",
      "Dars-e-Nizami",
      "Islamic Theology",
      "Arabic Literature",
    ],
  };

  // State and profession data
  const [professionSearch, setProfessionSearch] = React.useState("");

  const professions = {
    "IT & Software": [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Web Developer",
      "Mobile App Developer",
      "DevOps Engineer",
      "Cloud Engineer",
      "Data Analyst",
      "Data Scientist",
      "AI / ML Engineer",
      "Cyber Security Engineer",
      "QA / Test Engineer",
      "System Administrator",
      "IT Support Engineer",
    ],

    Healthcare: [
      "Doctor",
      "Surgeon",
      "Dentist",
      "Nurse",
      "Pharmacist",
      "Physiotherapist",
      "Medical Officer",
      "Lab Technician",
      "Radiologist",
      "Medical Representative",
      "Hospital Administrator",
    ],

    Education: [
      "Teacher",
      "Professor",
      "Lecturer",
      "School Principal",
      "Tutor",
      "Counselor",
      "Education Consultant",
      "Online Educator",
    ],

    "Business & Finance": [
      "Business Owner",
      "Entrepreneur",
      "Startup Founder",
      "Accountant",
      "Chartered Accountant",
      "Company Secretary",
      "Financial Analyst",
      "Banker",
      "Relationship Manager",
      "Investment Advisor",
      "Stock Market Trader",
      "Insurance Advisor",
    ],

    Government: [
      "IAS Officer",
      "IPS Officer",
      "Government Officer",
      "Clerk",
      "PSU Employee",
      "Municipal Employee",
      "Public Sector Staff",
    ],

    Defence_Security: [
      "Army Officer",
      "Navy Officer",
      "Air Force Officer",
      "Police Officer",
      "Security Officer",
      "Home Guard",
    ],

    Engineering_Non_IT: [
      "Civil Engineer",
      "Mechanical Engineer",
      "Electrical Engineer",
      "Electronics Engineer",
      "Chemical Engineer",
      "Automobile Engineer",
      "Production Engineer",
    ],

    Creative: [
      "Graphic Designer",
      "UI/UX Designer",
      "Interior Designer",
      "Fashion Designer",
      "Photographer",
      "Videographer",
      "Writer",
      "Content Creator",
      "Journalist",
      "Musician",
    ],

    Sales_Marketing: [
      "Sales Executive",
      "Marketing Manager",
      "Digital Marketing Executive",
      "SEO Specialist",
      "Social Media Manager",
      "Brand Manager",
      "Business Development Executive",
    ],

    Skilled_Technical: [
      "Electrician",
      "Plumber",
      "Carpenter",
      "Welder",
      "Mechanic",
      "Technician",
      "AC Technician",
    ],

    Service_Industry: [
      "Hotel Manager",
      "Restaurant Manager",
      "Chef",
      "Cook",
      "Waiter",
      "Housekeeping Staff",
      "Travel Consultant",
    ],

    Transport_Logistics: [
      "Driver",
      "Delivery Executive",
      "Fleet Manager",
      "Logistics Coordinator",
      "Warehouse Manager",
    ],

    Agriculture_Allied: [
      "Farmer",
      "Agriculture Officer",
      "Dairy Farmer",
      "Poultry Farmer",
      "Horticulturist",
    ],

    Islamic_Religious: [
      "Imam",
      "Muazzin",
      "Alim",
      "Mufti",
      "Islamic Teacher",
      "Qari",
      "Hafiz-e-Quran",
    ],

    Homemaker: ["Homemaker", "Housewife", "Househusband"],

    Others: [
      "Self Employed",
      "Freelancer",
      "Consultant",
      "Contractor",
      "Not Working",
      "Student",
      "Retired",
      "Other",
    ],
  };

  const [profilepic, setProfilepic] = useState(null);

  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setProfileSize("Profile image must be less than 1MB")
      e.target.value = ""; // reset input
      return;
    }
    // Save file object or convert to base64 if needed
    setForm({ ...form, profilePic: file });
    setProfilepic(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profileFor", form.profileFor);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("gender", form.gender);
      formData.append("dob[day]", form.dob.day);
      formData.append("dob[month]", form.dob.month);
      formData.append("dob[year]", form.dob.year);
      formData.append("height[ft]", form.height.ft);
      formData.append("height[inch]", form.height.inch);
      formData.append("religion", form.religion);
      formData.append("sect", form.sect);
      formData.append("caste", form.caste);
      formData.append("maslak", form.maslak);
      formData.append("state", form.state);
      formData.append("city", form.city);
      formData.append("maritalStatus", form.maritalStatus);
      formData.append("mobile", form.mobile);
      formData.append("motherTongue", form.motherTongue);
      formData.append("qualification", form.qualification);
      formData.append("workSector", form.workSector);
      formData.append("profession", form.profession);
      formData.append("income", form.income);
      formData.append("subscription", form.subscription);
      // only add image if available
      if (form.profilePic) {
        formData.append("profilePic", form.profilePic);
      }

      setTimeout(() => {
        setLoading(false);
      }, [2000]);
      const res = await fetch(`${Host}/api/auth/register`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data, "data");

      if (res.ok) {
        setLoading(false);
        localStorage.setItem("token", data.token);
        navigate("/app/congrats"); // ✅ go to congrats page
      } else {
        setLoading(false);
        setApiError(data?.error || "Registration failed");
        console.log("Registeration failed");
        setStep(0);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const validateStep = () => {
    const requiredFields = stepValidation[step];
    if (!requiredFields) return true;

    let newErrors = {};

    requiredFields.forEach((field) => {
      if (field === "dob") {
        if (!form.dob.day || !form.dob.month || !form.dob.year) {
          newErrors.dob = "Please select your date of birth";
        }
      } else if (field === "email") {
        if (!form.email) {
          newErrors.email = "Email is required";
        } else if (!isValidEmail(form.email)) {
          newErrors.email = "Please enter a valid email address";
        }
      } else if (field === "height") {
        if (!form.height.ft) {
          newErrors.height = "Please select your height";
        }
      } else if (!form[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      console.log("clicked");
      nextStep();
    }
  };

  const handleSendOtp = async () => {
    if (!form.email || !form.name || !form.password) {
      setErrors({ email: "Required", name: "Required", password: "Required" });
      return;
    }

    setLoading(true);

    const res = await fetch(`${Host}/api/auth/signup-send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email }),
    });

    const data = await res.json();
    setLoading(false);
    
    if (res.ok) {
      nextStep();
      setOtpSent(true);
    } else {
      setApiError(data.msg || "OTP sending failed");
      setTimeout(() => {
        setApiError("")
      }, 2000);
    }
  };

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="sign-page page">
      <div className="page-box registration">
        <img className="signup-logo" src={logo} alt="" />
        <h2>
          {step > 0 && <ChevronLeft onClick={prevStep} className="back-btn" />}
          Register
        </h2>
        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="signup-container form">

          {/* Step Content */}
          <div className="step-content">
            {step === 0 && (
              <div>
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={errors.name ? "error-input" : ""}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
                {apiError && (
                  <span className="error-text">{apiError}</span>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });

                    if (errors.email && isValidEmail(e.target.value)) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  className={errors.email ? "error-input" : ""}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className={errors.password ? "error-input" : ""}
                  />

                  <span
                    className="password-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </span>
                </div>

                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>
            )}
            {step === 1 && (
              <div>
                <h2>Verify OTP</h2>
                <p>{otpSent && `OTP sent to ${form.email}`}</p>

                {otpError && <span className="error-text">{otpError}</span>}

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                {!otpVerified ? (
                  <button
                    className="btn primary"
                    onClick={async () => {
                      const res = await fetch(`${Host}/api/auth/verify-otp`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: form.email,
                          otp,
                          type: "signup",
                        }),
                      });

                      const data = await res.json();

                      if (res.ok) {
                        setOtpVerified(true);
                        setOtpError("");
                      } else {
                        setOtpError(data.msg || "Invalid OTP");
                      }
                    }}
                  >
                    Verify OTP
                  </button>
                ) : (
                  <button className="btn success" onClick={nextStep}>
                    Continue
                  </button>
                )}
              </div>
            )}
            {step === 2 && (
              <div>
                <h2>Who are you creating this profile for?</h2>
                {errors.profileFor && (
                  <span className="error-text">Please select Profile for</span>
                )}
                <div
                  className={`radio-group ${errors.profileFor ? "error-border" : ""
                    }`}
                >
                  {[
                    "Self",
                    "Son",
                    "Daughter",
                    "Brother",
                    "Sister",
                    "Friend/Relative",
                  ].map((option) => (
                    <label key={option} className="radio-option">
                      <span>{option}</span>
                      <input
                        type="radio"
                        name="profileFor"
                        value={option}
                        checked={form.profileFor === option}
                        onChange={(e) => {
                          setForm({ ...form, profileFor: e.target.value });
                          nextStep(); // 👈 auto move to next step
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2>What is your Gender?</h2>
                {errors.gender && (
                  <span className="error-text">Please select gender</span>
                )}
                <div
                  className={`radio-group gender-group ${errors.gender ? "error-border" : ""
                    }`}
                >
                  {["Male", "Female"].map((option) => (
                    <label key={option} className="radio-option gender-option">
                      {option === "Male" ? (
                        <img className="gender-img" src={male} alt="" />
                      ) : (
                        <img className="gender-img" src={female} alt="" />
                      )}
                      <span>{option}</span>
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={form.gender === option}
                        onChange={(e) => {
                          setForm({ ...form, gender: e.target.value });
                          nextStep(); // 👈 auto move to next step
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2>What is your date of birth?</h2>
                {errors.dob && (
                  <span className="error-text">Please select DOB</span>
                )}
                <div className="dob-picker">
                  <Picker
                    value={form.dob}
                    onChange={(val) => setForm({ ...form, dob: val })}
                  >
                    <Picker.Column name="day">
                      {[...Array(31)].map((_, i) => (
                        <Picker.Item key={i + 1} value={i + 1}>
                          {i + 1}
                        </Picker.Item>
                      ))}
                    </Picker.Column>

                    <Picker.Column name="month">
                      {[
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
                      ].map((m) => (
                        <Picker.Item key={m} value={m}>
                          {m}
                        </Picker.Item>
                      ))}
                    </Picker.Column>

                    <Picker.Column name="year">
                      {Array.from({ length: 50 }, (_, i) => 1980 + i).map(
                        (y) => (
                          <Picker.Item key={y} value={y}>
                            {y}
                          </Picker.Item>
                        )
                      )}
                    </Picker.Column>
                  </Picker>
                </div>
                {/* Show age below */}
                {form.dob.day && form.dob.month && form.dob.year && (
                  <p className="age-display">
                    You are{" "}
                    {calculateAge(form.dob.day, form.dob.month, form.dob.year)}{" "}
                    years old
                  </p>
                )}
              </div>
            )}
            {/* STEP 4: Religion & Sect */}
            {step === 5 && (
              <div>
                <h2>How Tall are you?</h2>
                {errors.height && (
                  <span className="error-text">Please select Height</span>
                )}
                <div className="dob-picker">
                  <Picker
                    value={form.height}
                    onChange={(val) => setForm({ ...form, height: val })}
                  >
                    <Picker.Column name="ft">
                      {[...Array(10)].map((_, i) => (
                        <Picker.Item key={i} value={i}>
                          {i} ft
                        </Picker.Item>
                      ))}
                    </Picker.Column>
                    <Picker.Column name="inch">
                      {[...Array(11)].map((_, i) => (
                        <Picker.Item key={i} value={i}>
                          {i} in
                        </Picker.Item>
                      ))}
                    </Picker.Column>
                  </Picker>
                </div>
                {form.height.ft && form.height.inch && (
                  <p className="age-display">
                    You are {form.height.ft} ft {form.height.inch || 0} in tall
                  </p>
                )}
              </div>
            )}
            {step === 6 && (
              <div>
                <h2>Religion & Sect</h2>

                {/* <p>Religion (default: Muslim)</p> */}
                <input type="text" value="Muslim" disabled />

                <h4>What is your sect?</h4>
                {errors.sect && (
                  <span className="error-text">Please select sect</span>
                )}
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
                          nextStep();
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Caste */}
            {step === 7 && (
              <div>
                <h2>What is your caste?</h2>
                {errors.caste && (
                  <span className="error-text">Please select caste</span>
                )}
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
                          nextStep(); // 👈 auto go to next step
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Maslak */}
            {step === 8 && (
              <div>
                <h2>Do you follow a specific maslak?</h2>
                {errors.maslak && (
                  <span className="error-text">Please select maslak</span>
                )}
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
                          nextStep();
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Location */}
            {step === 9 && (
              <div>
                <h2>Where do you currently live?</h2>
                <h4>Select State</h4>
                {errors.state && (
                  <span className="error-text">{errors.state}</span>
                )}
                <select name="state" value={form.state} onChange={handleChange}>
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

                <h4>Select City</h4>
                {errors.city && (
                  <span className="error-text">{errors.city}</span>
                )}
                <select name="city" value={form.city} onChange={handleChange}>
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
              </div>
            )}

            {/* STEP 9: Family Location */}
            {step === 10 && (
              <div >
                <h2>Does your family also live here?</h2>
                {/* Show selected location from Step 8 */}
                <div className="radio-group">
                  {form.state && form.city && (
                    <div className="selected-location-box">
                      <p>
                        <strong>Your Location:</strong> {form.city}, {form.state}
                      </p>
                    </div>
                  )}
                  {errors.familyLivesHere && (
                    <span className="error-text">Please select </span>
                  )}
                  <div className="radio-group Sect-group" style={{ display: "contents" }}>
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="radio-option">
                        <span>{option}</span>
                        <input
                          type="radio"
                          name="familyLivesHere"
                          value={option}
                          checked={form.familyLivesHere === option}
                          onChange={(e) => {
                            setForm({ ...form, familyLivesHere: e.target.value });
                            if (e.target.value === "Yes") {
                              nextStep(); // 👈 go next if Yes
                            }
                          }}
                        />
                      </label>
                    ))}
                  </div>

                  {/* If "No", show state & city */}
                  {form.familyLivesHere === "No" && (
                    <div className="family-location">
                      <h4>Select State</h4>
                      {errors.familyState && (
                        <span className="error-text">{errors.familyState}</span>
                      )}
                      <select
                        name="familyState"
                        value={form.familyState}
                        onChange={handleChange}
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
                      {errors.familyCity && (
                        <span className="error-text">{errors.familyCity}</span>
                      )}
                      <h4>Select City</h4>
                      <select
                        name="familyCity"
                        value={form.familyCity}
                        onChange={handleChange}
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
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* STEP 8: Marital Status */}
            {step === 11 && (
              <div>
                <h2>What is your marital status?</h2>
                {errors.maritalStatus && (
                  <span className="error-text">
                    Please select Marital Status
                  </span>
                )}
                <div className="radio-group">
                  {["Single", "Divorced", "Widowed"].map(
                    (status) => (
                      <label key={status} className="radio-option">
                        <span>{status}</span>
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={status}
                          checked={form.maritalStatus === status}
                          onChange={(e) => {
                            setForm({ ...form, maritalStatus: e.target.value });
                            nextStep();
                          }}
                        />
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            {/* STEP 9: Mobile Number */}
            {step === 12 && (
              <div>
                <h2>What is your mobile number?</h2>
                {errors.mobile && (
                  <span className="error-text">{errors.mobile}</span>
                )}
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? "error-input" : ""}
                />
              </div>
            )}

            {/* STEP 10: Mother Tongue */}
            {step === 13 && (
              <div>
                <h2>What is your mother tongue?</h2>
                {errors.motherTongue && (
                  <span className="error-text">
                    Please select Mother Tongue
                  </span>
                )}
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
                            nextStep();
                          }}
                        />
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            {/* STEP 11: Qualification */}
            {step === 14 && (
              <div>
                <h2>What is your highest qualification?</h2>
                {errors.qualification && (
                  <span className="error-text">
                    Please select qualification
                  </span>
                )}
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  style={{
                    marginBottom: "10px",
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
                      <div key={stream} style={{ marginBottom: "10px" }}>
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
                                nextStep();
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

            {/* STEP 12: Work Sector */}
            {step === 15 && (
              <div>
                <h2>What sector you work in?</h2>
                <div className="radio-group">
                  {[
                    "Business / Self Employed",
                    "Private Sector",
                    "Government / Public Sector",
                    "Civil Services",
                    "Defence Services",
                    "PSU (Public Sector Undertaking)",
                    "Startup",
                    "NGO / Social Work",
                    "Freelancer / Consultant",
                    "Agriculture",
                    "Skilled Trade",
                    "Service Industry",
                    "Not Working",
                    "Student",
                    "Retired",
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
                          nextStep();
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 13: Profession */}
            {step === 16 && (
              <div>
                <h2>What is your profession?</h2>

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
                                  nextStep();
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

            {/* STEP 14: Annual Income */}
            {step === 17 && (
              <div>
                <h2>What is your annual income?</h2>
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

            {/* STEP 15: Profile Picture */}
            {step === 18 && (
              <div>
                <h2>Add your photo to get 10X more matches</h2>
                {form.profilePic ? (
                  <>
                    <div className="profile-pic-box profile-pic-image">
                      <img
                        src={URL.createObjectURL(form.profilePic)}
                        alt="Profile"
                      />
                    </div>
                    <p className="skip-btn" onClick={() => setProfilepic(true)}>
                      Choose another
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      className="profile-pic"
                      onClick={() => setProfilepic(true)}
                    >
                      Choose Image
                    </button>
                    <p onClick={nextStep} className="skip-btn">
                      Skip for now{" "}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* STEP 16: Subscription */}
            {step === 19 && (
              <div>
                <h2>Congratulations!</h2>
                <p className="skip-btn">
                  You have successfully completed the required fields. <br /> Click on the registration button to continue.
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="step-actions">

            {step === 0 && (
              <>
                {loading ?
                  <button onClick={handleSendOtp} className="btn primary">
                    "Processing ..."
                  </button>
                  :
                  <button onClick={handleSendOtp} className="btn primary">
                    Send OTP
                  </button>}
              </>
            )}

            {step > 1 && step !== steps.length - 2 && (
              <button onClick={handleNext} className="btn primary">
                Continue
              </button>
            )}

            {step === steps.length - 2 && (
              <button onClick={handleRegister} className="btn success">
                Register
              </button>
            )}

          </div>
        </div>
        {step === 0 && (
          <>
            {/* <p className="google-signup" onClick={() => handleGoogle()}>
              <FcGoogle /> Sign up with Google
            </p> */}
            <span className="or">OR</span>
            <p className="login-register">
              Already have an account?{" "}
              <span className="link" onClick={() => navigate("/app/login")}>
                Login
              </span>
            </p>
          </>
        )}
      </div>
      <div className={`profile-modal ${profilepic === true ? "active" : ""}`}>
        {/* Close button */}
        <div
          className="close-profile-modal"
          onClick={() => setProfilepic(false)}
        >
          <X />
        </div>

        {/* Content */}
        <div className="profile-modal-box profile-pic-box">
          <h5>Upload a clear photo</h5>
          <p>This is going to be your first imression</p>
          <div className="profile-pic-image">
            {form.profilePic ? (
              <img src={URL.createObjectURL(form.profilePic)} alt="" />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2020/12/17/20/02/woman-5840437_1280.jpg"
                alt=""
              />
            )}
          </div>
          <button
            className="btn primary"
            onClick={() => fileInputRef.current.click()}
          >
            Upload From Gallery
          </button>

          {profileSize && <p>{profileSize}</p>}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
