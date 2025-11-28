import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import img1 from "../../Assets/register.png";
import logo from "../../Assets/Logo/logo.png";
import { ChevronLeft, X } from "lucide-react";
import male from "../../Assets/male.png";
import female from "../../Assets/female.png";
import Picker from "react-mobile-picker";
import plan1 from "../../Assets/Plan/star.png";
import plan2 from "../../Assets/Plan/diamond.png";
import plan3 from "../../Assets/Plan/crown.png";
import Host from "../../Host/Host";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const steps = [
  "Profile For",
  "Basic Info",
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
    Arts: ["B.A", "B.Ed", "B.M.C.", "B.J.M.C.", "B.M.M."],
    Commerce: ["B.Com", "B.B.A", "B.B.M"],
    Science: ["B.Sc.", "B.Pharm", "B.Tech"],
    Computer: ["B.C.A", "B.Sc. Computer Science", "B.Tech IT"],
  };

  // State and profession data
  const [professionSearch, setProfessionSearch] = React.useState("");

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

  const [profilepic, setProfilepic] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Save file object or convert to base64 if needed
      setForm({ ...form, profilePic: file });
      setProfilepic(false);
    }
  };

  if (step === 19) {
    navigate("/congrats");
  }

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
      },[2000]);
      const res = await fetch(`${Host}/api/auth/register`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data,"data")

      if (res.ok) {
        setLoading(false);
        localStorage.setItem("token", data.token);
        navigate("/congrats"); // ✅ go to congrats page
      } else {
        console.log("Registeration failed");
        // alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // alert("Something went wrong during registration");
    }
  };

  console.log(loading,"loading")

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="sign-page">
      <div className={`signup-top ${loading ? "loading" : ""}`}>
        <span>Find exactly the</span>
        <h5>Right Partner for you!</h5>
        <img className="signup-logo" src={logo} alt="" />
        {!loading ? (
          <>
            <h2>Let's Get Started!</h2>
            <p>Create your account</p>
          </>
        ) : (
          <div className="signup-loading-text">
            <h2>Getting Things Ready</h2>
            <DotLottieReact
              src="https://lottie.host/fb3a7cfa-4d6c-4829-a42e-2aadb2742424/seUY29Eqkz.lottie"
              loop
              autoplay
            />
          </div>
        )}

        <img className="therm_img" src={img1} alt="" />
      </div>
      <div className="sign-page-box registration">
        <h2>
          {step > 0 && <ChevronLeft onClick={prevStep} className="back-btn" />}
          Register
        </h2>
        <div className="signup-container">
          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Step Content */}
          <div className="step-content">
            {step === 0 && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {step === 1 && (
              <div>
                <h2>Who are you creating this profile for?</h2>
                <div className="radio-group">
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

            {step === 2 && (
              <div>
                <h2>What is your Gender?</h2>
                <div className="radio-group gender-group">
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

            {step === 3 && (
              <div>
                <h2>What is your date of birth?</h2>
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
            {step === 4 && (
              <div>
                <h2>How Tall are you?</h2>
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
            {step === 5 && (
              <div>
                <h2>Religion & Sect</h2>
                {/* <p>Religion (default: Muslim)</p> */}
                <input type="text" value="Muslim" disabled />

                <h4>What is your sect?</h4>
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
            {step === 6 && (
              <div>
                <h2>What is your caste?</h2>
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
            {step === 7 && (
              <div>
                <h2>Do you follow a specific maslak?</h2>
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
            {step === 8 && (
              <div>
                <h2>Where do you currently live?</h2>
                <h4>Select State</h4>
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
            {step === 9 && (
              <div>
                <h2>Does your family also live here?</h2>
                {/* Show selected location from Step 8 */}
                {form.state && form.city && (
                  <div className="selected-location-box">
                    <p>
                      <strong>Your Location:</strong> {form.city}, {form.state}
                    </p>
                  </div>
                )}
                <div className="radio-group Sect-group">
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
            )}

            {/* STEP 8: Marital Status */}
            {step === 10 && (
              <div>
                <h2>What is your marital status?</h2>
                <div className="radio-group">
                  {["Single", "Married", "Divorced", "Widowed"].map(
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
            {step === 11 && (
              <div>
                <h2>What is your mobile number?</h2>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* STEP 10: Mother Tongue */}
            {step === 12 && (
              <div>
                <h2>What is your mother tongue?</h2>
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
            {step === 13 && (
              <div>
                <h2>What is your highest qualification?</h2>

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
            {step === 14 && (
              <div>
                <h2>What sector you work in?</h2>
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
                          nextStep();
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 13: Profession */}
            {step === 15 && (
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
            {step === 16 && (
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
            {step === 17 && (
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
            {step === 18 && (
              <div>
                <h2>Choose Subscription</h2>
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
                </div>
                <p onClick={handleRegister} className="skip-btn">
                  Maybe Later
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="step-actions">
            {step !== steps.length - 2 ? (
              <button onClick={nextStep} className="btn primary">
                Continue
              </button>
            ) : (
              <button
                onClick={() => navigate("/subscription")}
                className="btn success"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
        {step === 0 && (
          <>
            <span className="or">OR</span>
            <p className="login-register">
              Already user?{" "}
              <span className="link" onClick={() => navigate("/login")}>
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
