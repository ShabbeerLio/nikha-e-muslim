import React, { useEffect, useState } from 'react';
import "./Loading.css";
import logo from "../../Assets/Logo/logo.png";

const quotes = "Nikha is Sunnah and by doing it You are completing your Iman"

const Loading = () => {

    return (
        <div className="loading-screen">
            <img src={logo} alt="App Logo" />
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;