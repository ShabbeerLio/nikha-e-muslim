import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WContact.css";

const WContact = () => {

   const [formData, setFormData] = useState({
        name: "",
        phone: "",
        course: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Message Sent Successfully!");
    };

  return (
    <main className="main">
      <section className="serv-comp">
        <div className="common-container">
          <div className="comn-heading">
            <h3>
              Contact <span>Us</span>{" "}
            </h3>
            <div className="contact-container">
              {/* LEFT IMAGE */}
              <div className="contact-left">
                <img
                  src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=900&auto=format&fit=crop&q=60"
                  alt="Contact"
                />
              </div>

              {/* RIGHT FORM */}
              <div className="contact-right">
                <div className="test-right">
                  <h2>Get in Touch with Us</h2>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-items">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your Email"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-items">
                      <div className="form-group">
                        <input
                          type="number"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      {/* <label>Your Message</label> */}
                      <textarea
                        name="message"
                        placeholder="Write your message..."
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="contact-btn">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="contact-bottom">
              <Link className="contact-bottom-box">
                <Phone/>
                <h5>call us any time!</h5>
                <p>+91 99999 99999</p>
              </Link>
              <Link className="contact-bottom-box">
                <Mail />
                <h5>send us e-mail</h5>
                <p>nikahemuslim@gmail.com</p>
              </Link>
              <Link className="contact-bottom-box">
                <MapPin />
                <h5>Office Address</h5>
                <p>Bihar</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WContact;
