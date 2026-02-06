import "./WebView.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronDown, CircleCheckBig, MoveRight } from "lucide-react";
import { useEffect } from "react";
import service1 from "../../Assets/WebView/verified.png"
import service2 from "../../Assets/WebView/matchmaking.png"
import service3 from "../../Assets/WebView/chat system.png"
import service4 from "../../Assets/WebView/family-friendly.png"
import service5 from "../../Assets/WebView/shortlist.png"
import service6 from "../../Assets/WebView/subscription.png"

const WebView = () => {
  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  useEffect(() => {
    const faqBx = document.querySelectorAll(".faq-bx");

    faqBx.forEach((item, index) => {
      item.addEventListener("click", () => {
        faqBx.forEach((bx) => bx.classList.remove("faqactive"));
        item.classList.add("faqactive");
      });
    });

    // ✅ Cleanup listeners on unmount
    return () => {
      faqBx.forEach((item) => {
        item.replaceWith(item.cloneNode(true)); // removes attached listeners
      });
    };
  }, []);

  return (
    <>
      <main className="main">
        <section className="hero-comp">
          <div className="common-container">
            <div className="hero-grid">
              <div className="hero-info-bx">
                <h1>
                  Nikah-e-Muslim: <span>Trusted</span> Islamic platform for
                  <span> Nikah, matchmaking</span> and
                  <span> meaningful connections.</span>
                </h1>

                <p>
                  Nikah-e-Muslim helps Muslims find the right life partner in a
                  <b> halal, respectful</b> and <b>secure</b> way by combining
                  <b> faith-based matchmaking</b> with modern technology.
                </p>
                <div className="hero-downloads">
                  <Link>
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/bbab346e-4485-40b7-aaed-a2c68a2921b9/95u1TvWlcg.lottie"
                        loop
                        autoplay
                      />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="right-hero-form-bx">
                <h6>Do you have any Query</h6>
                <form action="#">
                  <div className="h-inpt-bx">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                  </div>

                  <div className="h-inpt-bx">
                    <input
                      type="email"
                      name="emailbx"
                      id="emailbx"
                      placeholder="Email"
                    />
                  </div>

                  <div className="h-inpt-bx">
                    <input
                      type="text"
                      name="number"
                      id="number"
                      placeholder="Number"
                    />
                  </div>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Your Query"
                  />

                  <button type="submit" className="form-submt-btn">
                    Submit Your Query
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="slider-text-sec">
        <div className="slider-back-bx">
          <div className="slider-text-comp">
            <p>
              Verified Muslim Profiles <span>Halal Matchmaking</span> Secure
              Chat
              <span> Privacy First </span>
              Nikah-e-Muslim <span>Family Oriented</span> Serious Intentions
              Only
              <span>Islamic Values</span>
              Verified Muslim Profiles <span>Halal Matchmaking</span> Secure
              Chat
              <span>Privacy First</span>
            </p>
          </div>
        </div>
      </section>
      <section className="choose-us-comp">
        <div className="common-container">
          <div className="choose-us-grid">
            <div className="left-chooseus-img">
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success"
                  src="https://lottie.host/c08624e7-818c-42c1-9046-f1087f1e663b/EoC98Sa2yq.lottie"
                  loop
                  autoplay
                  onError={(e) => console.error("Lottie load error:", e)}
                />
              </div>
            </div>

            <div className="right-choose-us-info">
              <h3>
                Why <span>Choose Nikah-e-Muslim?</span>
              </h3>

              <p>
                <CircleCheckBig /> Islamic & Halal Approach – Built strictly
                around Islamic principles and Nikah values.
              </p>

              <p>
                <CircleCheckBig /> Genuine Profiles Only – Strong verification
                to keep the platform safe and trustworthy.
              </p>

              <p>
                <CircleCheckBig /> Privacy & Respect – Your data and
                conversations are protected.
              </p>

              <p>
                <CircleCheckBig /> Serious Intentions – Designed for marriage,
                not casual dating.
              </p>

              <p>
                <CircleCheckBig /> Easy Matchmaking – Smart filters for age,
                location, sect, education, and lifestyle.
              </p>

              <p>
                <CircleCheckBig /> For Every Muslim – Whether you are a
                professional, student, or business owner.
              </p>

              <p>
                Nikah-e-Muslim is a faith-first matchmaking platform that helps
                Muslims find compatible life partners with dignity, trust, and
                simplicity.
              </p>

              <a href="#">
                <button className="form-submt-btn">
                  Start Your Nikah Journey  <MoveRight />
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="serv-comp">
        <div className="common-container">
          <div className="comn-heading">
            <h3>
              Our <span>Service</span>{" "}
            </h3>
          </div>

          <div className="serv-grid-main">
            <div className="serv-box">
              <h5>Verified Muslim Profiles</h5>
              <p>
                All profiles are reviewed to ensure authenticity and serious
                intent.
              </p>

              <a href="#" className="read-more-btn-bx">
                <div className="arrow-bx">
                  <FaLongArrowAltRight />
                </div>

                <button>Read more</button>
              </a>

              <div className="serv-img-bx">
                <div className="wallet-status">
                  <img src={service1} alt="" />
                </div>
              </div>
            </div>

            <div className="serv-box">
              <h5>Halal Matchmaking</h5>
              <p>
                Matches based on Islamic values, compatibility, and preferences.
              </p>

              <a href="#" className="read-more-btn-bx">
                <div className="arrow-bx">
                  <FaLongArrowAltRight />
                </div>

                <button>Read more</button>
              </a>

              <div className="serv-img-bx">
                <div className="wallet-status">
                  <img src={service2} alt="" />
                </div>
              </div>
            </div>

            <div className="serv-box">
              <h5>Secure Chat System</h5>
              <p>
                Private and respectful communication with full user control.
              </p>

              <a href="#" className="read-more-btn-bx">
                <div className="arrow-bx">
                  <FaLongArrowAltRight />
                </div>

                <button>Read more</button>
              </a>

              <div className="serv-img-bx">
                <div className="wallet-status">
                  <img src={service3} alt="" />
                </div>
              </div>
            </div>

            <div className="serv-box">
              <h5>Family-Friendly Platform</h5>
              <p>
                Encourages involvement of families for a transparent Nikah
                process.
              </p>

              <a href="#" className="read-more-btn-bx">
                <div className="arrow-bx">
                  <FaLongArrowAltRight />
                </div>

                <button>Read more</button>
              </a>

              <div className="serv-img-bx">
                <div className="wallet-status">
                  <img src={service4} alt="" />
                </div>
              </div>
            </div>

            <div className="serv-box">
              <h5>Shortlist & Wishlist</h5>
              <p>
                Save profiles you like and manage your Nikah journey easily.
              </p>

              <a href="#" className="read-more-btn-bx">
                <div className="arrow-bx">
                  <FaLongArrowAltRight />
                </div>

                <button>Read more</button>
              </a>

              <div className="serv-img-bx">
                <div className="wallet-status">
                  <img src={service5} alt="" />
                </div>
              </div>
            </div>

            <div className="serv-box">
              <h5>Subscription Benefits</h5>
              <p>
                Unlock advanced features to connect faster with genuine matches.
              </p>

              <a href="#" className="read-more-btn-bx">
                <div className="arrow-bx">
                  <FaLongArrowAltRight />
                </div>

                <button>Read more</button>
              </a>

              <div className="serv-img-bx">
                <div className="wallet-status">
                  <img src={service6} alt="" />
                </div>
              </div>
            </div>
          </div>

          <a href="https://digitaldezire.com/" target="_blank"></a>
        </div>
      </section>

      

      <section className="faq-comp choose-us-comp">
        <div className="common-container">
          <div className="comn-heading comn-heading2">
            <h6>FAQ</h6>
            <h4>
              Frequently <span>Asked Question</span>{" "}
            </h4>
          </div>

          <div className="faq-main">
            <div className="faq-bx ">
              <div className="faq-title-btn-bx">
                <h5>What Is Nikah-e-Muslim?</h5>
                <div className="arrow-btn">
                  <ChevronDown />
                </div>
              </div>
              <p>
                Nikah-e-Muslim is a Muslim matrimonial platform created to help
                individuals find suitable life partners following Islamic
                guidelines and values.
              </p>
            </div>

            <div className="faq-bx ">
              <div className="faq-title-btn-bx">
                <h5>Is Nikah-e-Muslim Halal?</h5>
                <div className="arrow-btn">
                  <ChevronDown />
                </div>
              </div>
              <p>
                Yes. The platform promotes respectful communication, serious
                intentions, and marriage-focused interactions aligned with
                Islamic teachings.
              </p>
            </div>

            <div className="faq-bx ">
              <div className="faq-title-btn-bx">
                <h5>How Are Profiles Verified?</h5>
                <div className="arrow-btn">
                  <ChevronDown />
                </div>
              </div>
              <p>
                Profiles go through multiple verification steps including mobile
                verification and activity monitoring to ensure authenticity.
              </p>
            </div>

            <div className="faq-bx ">
              <div className="faq-title-btn-bx">
                <h5>Can Families Be Involved?</h5>
                <div className="arrow-btn">
                  <ChevronDown />
                </div>
              </div>
              <p>
                Yes. Nikah-e-Muslim encourages family involvement and
                transparency throughout the matchmaking and Nikah process.
              </p>
            </div>

            <div className="faq-bx ">
              <div className="faq-title-btn-bx">
                <h5>Is My Privacy Safe?</h5>
                <div className="arrow-btn">
                  <ChevronDown />
                </div>
              </div>
              <p>
                Absolutely. We prioritize user privacy with secure data
                handling, profile visibility controls, and safe messaging
                features.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebView;
