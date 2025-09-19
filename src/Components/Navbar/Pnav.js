import React, { useContext, useEffect, useRef, useState } from "react";
import "./Pnav.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  House,
  User,
  MessageCircleHeart,
  CopyCheck,
} from "lucide-react";

const Pnav = () => {
  // const { userDetail, getAccountDetails } = useContext(NoteContext);
  // const navigate = useNavigate();
  const location = useLocation();
  const [highlightProps, setHighlightProps] = useState({
    left: -9999,
    width: 0,
  });
  const navRefs = useRef([]);
  const [tail, setTail] = useState(null);
  // const user = userDetail;

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   } else {
  //     getAccountDetails();
  //   }
  // }, [navigate]);

  useEffect(() => {
    const links = ["/", "/matches", "/chats", "/profile"];

    const current = navRefs.current.find(
      (ref) => ref && ref.dataset.path === location.pathname
    );

    if (links.includes(location.pathname) && current) {
      const oldLeft = highlightProps.left + highlightProps.width / 2;
      const newLeft = current.offsetLeft + current.offsetWidth / 2;

      if (oldLeft !== newLeft) {
        setTail({ from: oldLeft, to: newLeft });
      }

      setHighlightProps({
        left: current.offsetLeft,
        width: "50px",
      });
    } else {
      // Hide highlight if route doesn't match any nav item
      setHighlightProps({ left: -9999, width: 0 });
    }
  }, [location]);

  useEffect(() => {
    if (tail) {
      const timeout = setTimeout(() => {
        setTail(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [tail]);

  return (
    <div className="Pnav">
      <ul>
        <li>
          <NavLink
            to={"/home"}
            className="nav-link"
            data-path={"/home"}
            ref={(el) => (navRefs.current[0] = el)}
          >
            <House />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/matches"}
            className="nav-link"
            data-path={"/matches"}
            ref={(el) => (navRefs.current[1] = el)}
          >
            <CopyCheck />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/chats"}
            className="nav-link"
            data-path={"/chats"}
            ref={(el) => (navRefs.current[2] = el)}
          >
            <MessageCircleHeart />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile"}
            className="nav-link"
            data-path={"/profile"}
            ref={(el) => (navRefs.current[3] = el)}
          >
            <User />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Pnav;
