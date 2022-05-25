import React from "react";
import { message, Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { userExist, addUser } from "../../server/api";

const SignUpForm = ({ onSignUpClick }) => {
  const [username, setUsername] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleSignUpClick = async () => {
    const res = await userExist(account);
    if (!res) {
      const newUser = {
        "account": account,
        "password": password,
        "username": username,
        "text": [],
        "status": "",
        "key": ""
      };
      const [msg] = await addUser(newUser);
      message.info(msg);
    } else {
      message.error("Error!");
    }
    onSignUpClick();
  };
  
  return (
    <Card >
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="Enter your account"
        size="large"
      />
      <br />
      <br />
      <Input.Password
        prefix={<UserOutlined />}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        size="large"
      />
      <br />
      <br />
      <Button block type="primary" onClick={handleSignUpClick}>
        {" "}
        Sign up{" "}
      </Button>
    </Card>
  );
};

export default SignUpForm;