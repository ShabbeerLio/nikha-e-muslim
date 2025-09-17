import react from "react";
import SadaqahContext from "./SadaqahContext";
import { useState } from "react";

const ContextState = (props) => {
  const userData = [];

  const [userDetail, setUserDetail] = useState(userData);

  // Get getAccount detail
  const getAccountDetails = async () => {
    // const response = await fetch(`${Host}/auth/getaccount`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": localStorage.getItem("token"),
    //   },
    // });
    // const json = await response.json();
    // // console.log(json, "json");
    // setUserDetail(json);
  };


  return (
    <SadaqahContext.Provider
      value={{
        userDetail,
        getAccountDetails,
      }}
    >
      {props.children}
    </SadaqahContext.Provider>
  );
};

export default ContextState;
