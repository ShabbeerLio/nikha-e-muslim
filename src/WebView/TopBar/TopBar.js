import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Logo/logo.png";
import { FaWhatsapp, FaGooglePlay } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    navigate("/");
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    console.log("clicked")
    setMenuOpen(!menuOpen);
  }

  return (
    <section className="top-header-comp">
      <div className="common-container top-hedr-flex">
        <div className="logo-bx">
          <img onClick={handleLinkClick} src={logo} alt="" />
        </div>
        <div className="menu-box">
          <Menu onClick={() => handleMenu()} />
        </div>
        <div className={`menu-items ${menuOpen ? "open" : ""}`}>
          <div className="menu-close">
            <X onClick={() => handleMenu()} />
          </div>
          <div className="menu-box-item">
            <ul>
              <li><Link onClick={() => handleMenu()} to={"/"}>Home</Link></li>
              <li><Link onClick={() => handleMenu()} to={"/about"}>About Us</Link></li>
              <li><Link onClick={() => handleMenu()} to={"/contact"}>Contact Us</Link></li>
              <li><Link onClick={() => handleMenu()} to={"/privacy-policy"}>Privacy Policy</Link></li>
              <li><Link onClick={() => handleMenu()} to={"/term-and-conditions"}>Term And Conditions</Link></li>
              <li><Link onClick={() => handleMenu()} to={"/return-refund"}>Return Refund</Link></li>
            </ul>
          </div>
          <div className="flex-btn-bx more-btns">
            <button className="comn-btn">
              <Link to="">
                <FaGooglePlay />
                Download from Playstore{" "}
              </Link>
            </button>
            {/* <button className="comn-btn">
              <Link to="">
                <FaWhatsapp />
              </Link>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
