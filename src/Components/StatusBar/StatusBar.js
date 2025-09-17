import React from 'react'
import "./StatusBar.css"

const StatusBar = ({Users}) => {

    return (
        <div className='StatusBar'>
            {Users.map((item) => (
                <div className="statusbar-box">
                    <img src={item.img} alt="" />
                    <span className={`status ${item.active === true && "active"}`}></span>
                </div>
            ))}
        </div>
    )
}

export default StatusBar
