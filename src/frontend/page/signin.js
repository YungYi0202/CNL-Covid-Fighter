import React from "react";
import { message, Button } from "antd";
import { checkUser } from "../../server/api";
import BeforeSignin from "./beforesignin";
import Status from "../page/status";
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
  return (
    <>
      {!signedIn ? (
        <BeforeSignin
          setAccount={setAccount}
          setPassword={setPassword}
          handleSubmitClick={handleSubmitClick}
        />
      ) : (
        <Status
          user={user}
          setUser={setUser}
          handleLogoutClick={handleLogoutClick}
        />
      )}
    </>
  );
};

export default Signin;
