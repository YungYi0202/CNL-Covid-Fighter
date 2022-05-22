import React from "react";
import { message, Button } from "antd";
import { checkUser } from "../../server/api";
import BeforeSingin from "./beforesignin";
import AfterSignin from "./aftersignin";
import { isEmpty } from "../utils/utils";

const Signin = ({ user, setUser }) => {
  const [signedIn, setSignedIn] = React.useState(Object.keys(user).length);
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState(
    isEmpty(user) ? "" : user.username
  );
  const [text, setText] = React.useState(isEmpty(user) ? [] : user.text);

  const handleLogoutClick = () => {
    setSignedIn(false);
    setUser({});
    setUsername("");
    setText([]);
    message.info("Sign out!");
  };

  const handleSubmitClick = async () => {
    const res = await checkUser(account, password);
    if (Object.keys(res).length) {
      setUser(res);
      setSignedIn(true);
      setUsername(res.username);
      setText(res.text);
      message.info("Sign in!");
    } else {
      message.error("Error!");
    }
  };
  console.log("here!!" + text);
  return (
    <>
      {!signedIn ? (
        <BeforeSingin
          setAccount={setAccount}
          setPassword={setPassword}
          handleSubmitClick={handleSubmitClick}
        />
      ) : (
        <AfterSignin
          username={username}
          handleLogoutClick={handleLogoutClick}
          text={text}
        />
      )}
    </>
  );
};

export default Signin;
