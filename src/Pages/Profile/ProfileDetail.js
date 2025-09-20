import React from "react";
import "./ProfileDetail.css";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import Users from "../../Users"; // adjust path if needed
import { useNavigate, useParams } from "react-router-dom";


const ProfileDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = Users.find((u) => u.id.toString() === id);
    return (
        <div className="Profile-detail">
            <div className="Profile-main">
                <div className="profile-box">
                    <div className="profile-title">
                        <ChevronLeft onClick={() => navigate(-1)} />
                        <h2>Profile Detail</h2>
                        <EllipsisVertical />
                    </div>
                    <div className="profile-detail-top">
                        <img src={user.img} alt="" />
                        <h2>{user.name}</h2>
                        <p>Delhi</p>
                    </div>
                    <div className="profile-detail-bottom">
                        {/* <h2>Profile Detail</h2> */}
                        <h2>About me</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <h2>Qualifications</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque. Quam ullam laudantium tempora ipsum commodi expedita sit. At, quaerat quidem nisi velit quo accusamus quas sequi dicta molestiae deleniti illum! Maiores consequatur quis culpa, laudantium voluptatem iste dolor fuga, sint impedit nemo repellat totam eius officiis sapiente sed facilis?</p>

                    </div>
                    <div className="profiledetail-chat">
                        <p>Chat Now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
