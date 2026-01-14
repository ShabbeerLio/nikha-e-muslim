import React, { useContext, useEffect, useState } from "react";
import "./Matches.css";
import { ChevronLeft, FunnelPlus, Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import defaultimg from "../../Assets/default.jpg";

const Matches = () => {
  const { userDetail, getAccountDetails, allConnected, getAllConnected } =
    useContext(NoteContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [ageFilter, setAgeFilter] = useState("");
  const [eduFilter, setEduFilter] = useState("");
  const [casteFilter, setCasteFilter] = useState("");
  const [maslakFilter, setMaslakFilter] = useState("");
  const [sectFilter, setSectFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const getEducationLevel = (qualification) => {
    if (!qualification) return "";

    const q = qualification.toLowerCase();

    if (q.includes("10")) return "10th pass";
    if (q.includes("12")) return "12th pass";
    if (q.includes("b.") || q.includes("bachelor")) return "graduated";
    if (q.includes("m.") || q.includes("master")) return "masters";

    return "below 10th";
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/app/welcome");
    } else {
      getAccountDetails();
      getAllConnected();
    }
  }, [navigate]);

  console.log(allConnected, "allConnected");

  // ✅ Function to calculate age from DOB object
  const calculateAge = (dob) => {
    if (!dob?.year || !dob?.month || !dob?.day) return null;
    const birthDate = new Date(`${dob.year}-${dob.month}-${dob.day}`);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // ✅ Function to safely get profile picture based on privacy
  const getProfilePic = (profilePic, currentUserId) => {
    if (!profilePic) return defaultimg; // fallback

    if (profilePic.isHidden === false && profilePic.url) {
      return profilePic.url;
    }

    // if hidden but allowed for this user
    if (
      profilePic.isHidden === true &&
      profilePic.allowedUsers?.includes(currentUserId)
    ) {
      return profilePic.url;
    }

    // otherwise show default hidden image
    return defaultimg;
  };
  // ✅ Get logged-in user ID from token payload or store (assuming context has it)
  const currentUserId = userDetail?._id; // set when user logs in

  // ✅ Filter users based on search text
  const filteredUsers = allConnected.filter((user) => {
    const nameMatch = user?.name?.toLowerCase().includes(search.toLowerCase());

    const age = calculateAge(user?.dob);

    const ageMatch =
      !ageFilter ||
      (ageFilter === "18-25" && age >= 18 && age <= 25) ||
      (ageFilter === "26-30" && age >= 26 && age <= 30) ||
      (ageFilter === "31-40" && age >= 31 && age <= 40) ||
      (ageFilter === "40+" && age >= 40);

    const eduLevel = getEducationLevel(user?.qualification);
    const eduMatch = !eduFilter || eduFilter === eduLevel;

    const casteMatch = !casteFilter || user?.caste === casteFilter;

    const maslakMatch = !maslakFilter || user?.maslak === maslakFilter;

    const sectMatch = !sectFilter || user?.sect === sectFilter;

    const cityMatch =
      !cityFilter ||
      user?.city?.toLowerCase().includes(cityFilter.toLowerCase());

    const stateMatch =
      !stateFilter ||
      user?.state?.toLowerCase().includes(stateFilter.toLowerCase());

    return (
      nameMatch &&
      ageMatch &&
      eduMatch &&
      casteMatch &&
      maslakMatch &&
      sectMatch &&
      cityMatch &&
      stateMatch
    );
  });

  // const states = [
  //   "Uttar Pradesh",
  //   "Maharashtra",
  //   "Delhi",
  //   "Bihar",
  //   "Karnataka",
  // ];

  // const cities = {
  //   "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  //   Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  //   Delhi: ["Delhi"],
  //   Bihar: ["Patna", "Gaya"],
  //   Karnataka: ["Bengaluru", "Mysuru"],
  // };
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchStates = async () => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India" }),
      }
    );
    const data = await res.json();
    return data.data.states.map((s) => s.name);
  };

  const fetchCities = async (state) => {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: "India",
          state: state,
        }),
      }
    );
    const data = await res.json();
    return data.data;
  };

  useEffect(() => {
    const loadStates = async () => {
      const list = await fetchStates();
      setStates(list);
    };
    loadStates();
  }, []);

  const handleStateFilterChange = async (state) => {
    setStateFilter(state);
    setCityFilter("");

    if (!state) {
      setCities([]);
      return;
    }

    const cityList = await fetchCities(state);
    setCities(cityList);
  };

  const casteOptions = [
    "Syed",
    "Sheikh",
    "Pathan",
    "Ansari",
    "Qureshi",
    "Other",
  ];

  const maslakOptions = [
    "No Maslak",
    "Ahle Hadees",
    "Barelvi",
    "Deobandi",
    "Sufi",
    "Tablighi Jamaat",
    "Others",
  ];

  const sectOptions = ["Sunni", "Shia", "Other"];

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-box">
          <div className="matches-title">
            <ChevronLeft onClick={() => navigate(-1)} />
            <h2>Matches</h2>
          </div>

          <div className="chat-search matches">
            <input
              type="text"
              placeholder="Search matches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="filter-btn" onClick={() => setShowFilter(true)}>
              <FunnelPlus />
            </button>
          </div>

          <div className="home-style">
            <div className="matches-page">
              <div className="matches-grid">
                {filteredUsers.length === 0 ? (
                  <div className="empty-chats">
                    <DotLottieReact
                      src="https://lottie.host/5da26d68-f8cd-4ce6-bb5f-405c9e3e9525/2q8jrFO60R.lottie"
                      loop
                      autoplay
                    />
                    <p className="no-users">No matches found</p>
                  </div>
                ) : (
                  filteredUsers.map((match) => {
                    const receiver = match;
                    const age = calculateAge(receiver?.dob);
                    const imageUrl = getProfilePic(
                      receiver?.profilePic,
                      currentUserId
                    );

                    return (
                      <div
                        key={match._id}
                        className="match-card"
                        onClick={() =>
                          navigate(`/app/profile-detail/${receiver?._id}`)
                        }
                      >
                        <img
                          src={receiver?.profilePic.url || defaultimg}
                          alt={receiver?.name}
                          className="match-img"
                        />
                        <div className="match-info glass">
                          <span>
                            {receiver?.name}
                            {age && `, ${age}`}
                          </span>
                          <Heart
                            size={22}
                            fill="pink"
                            color="pink"
                            stroke="white"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        {showFilter && (
          <div className="filter-modal-overlay">
            <div className="filter-modal">
              <div className="filter-header">
                <h3>Filter Matches</h3>
                <X onClick={() => setShowFilter(false)} />
              </div>

              <div className="filter-body">
                <div className="filter-body-item">
                  <label>Education</label>
                  <select
                    value={eduFilter}
                    onChange={(e) => setEduFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="below 10th">Below 10th</option>
                    <option value="10th pass">10th Pass</option>
                    <option value="12th pass">12th Pass</option>
                    <option value="graduated">Graduated</option>
                    <option value="masters">Masters</option>
                  </select>
                </div>
                <div className="filter-body-box">
                  <div className="filter-body-item">
                    <label>Age</label>
                    <select
                      value={ageFilter}
                      onChange={(e) => setAgeFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="18-25">18 - 25</option>
                      <option value="26-30">26 - 30</option>
                      <option value="31-40">31 - 40</option>
                      <option value="40+">40+</option>
                    </select>
                  </div>
                  <div className="filter-body-item">
                    <label>Sect</label>
                    <select
                      value={sectFilter}
                      onChange={(e) => setSectFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {sectOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="filter-body-box">
                  <div className="filter-body-item">
                    <label>Caste</label>
                    <select
                      value={casteFilter}
                      onChange={(e) => setCasteFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {casteOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-body-item">
                    <label>Maslak</label>
                    <select
                      value={maslakFilter}
                      onChange={(e) => setMaslakFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {maslakOptions.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="filter-body-box">
                  <div className="filter-body-item">
                    <label>State</label>
                    {/* <select
                      value={stateFilter}
                      onChange={(e) => {
                        setStateFilter(e.target.value);
                        setCityFilter("");
                      }}
                    > */}
                    <select
                      value={stateFilter}
                      onChange={(e) => handleStateFilterChange(e.target.value)}
                    >
                      <option value="">All</option>
                      {states.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-body-item">
                    <label>City</label>
                    <select
                      value={cityFilter}
                      disabled={!stateFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {/* {stateFilter &&
                        cities[stateFilter]?.map((c) => ( */}
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="filter-footer">
                <button
                  className="btn primary"
                  onClick={() => setShowFilter(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
