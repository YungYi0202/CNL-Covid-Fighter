import React from "react";
import { message, Input, Button, Card, Menu, Dropdown, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { userExist, addUser } from "../../server/api";

const { Option } = Select;
const dormitories =
  [
    {
      label: "男一舍",
      key: "男一舍"
    },
    {
      label: "男二舍",
      key: "男二舍"
    },
    {
      label: "男三舍",
      key: "男三舍"
    },
    {
      label: "男四舍",
      key: "男四舍"
    },
    {
      label: "男五舍",
      key: "男五舍"
    },
    {
      label: "男六舍",
      key: "男六舍"
    },
    {
      label: "男七舍",
      key: "男七舍"
    },
    {
      label: "男八舍",
      key: "男八舍"
    },
    {
      label: "研一男舍",
      key: "研一男舍"
    },
    {
      label: "研一女舍",
      key: "研一女舍"
    },
    {
      label: "研三舍",
      key: "研三舍"
    },
    {
      label: "大一女舍",
      key: "大一女舍"
    },
    {
      label: "女一舍",
      key: "女一舍"
    },
    {
      label: "女二舍",
      key: "女二舍"
    },
    {
      label: "女三舍",
      key: "女三舍"
    },
    {
      label: "女四舍",
      key: "女四舍"
    },
    {
      label: "女五舍",
      key: "女五舍"
    },
    {
      label: "女六舍",
      key: "女六舍"
    },
    {
      label: "女八舍",
      key: "女八舍"
    },
    {
      label: "女九舍",
      key: "女九舍"
    }
  ];

const dormitories_node = [];
function add_dorm_option(dorm) {
  dormitories_node.push(<Option value={dorm["key"]}>{dorm["label"]}</Option>);
}
dormitories.forEach(add_dorm_option);

const vaccines = [
  {
    label: "AZ",
    key: "AZ"
  },
  {
    label: "Moderna",
    key: "Moderna",
  },
  {
    label: "BNT",
    key: "BNT",
  },
  {
    label: "高端",
    key: "高端",
  }
]

const vaccines_node = [];
function add_vaccine_option(vaccine) {
  vaccines_node.push(<Option value={vaccine["key"]}>{vaccine["label"]}</Option>);
}
vaccines.forEach(add_vaccine_option);

const SignUpForm = ({ onSignUpClick }) => {
  const [username, setUsername] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dormitory, setDormitory] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [vaccine1, setVaccine1] = React.useState("")
  const [vaccine2, setVaccine2] = React.useState("")
  const [vaccine3, setVaccine3] = React.useState("")

  const handleSignUpClick = async () => {
    if (account === "" || password === "" || username === "" || dormitory === "" || room === "") {
      message.error("您有未填欄位");
      return;
    }
    let doses = [vaccine1, vaccine2, vaccine3];
    doses.filter(dose => dose !== "");

    const res = await userExist(account);
    if (!res) {
      const newUser = {
        "account": account,
        "password": password,
        "username": username,
        "text": [],
        "status": "healthy",
        "dormitory": dormitory,
        "room": room,
        "vaccine": {
          "num_doses": doses.length,
          "doses": doses
        },
        "key": ""
      };
      const [msg] = await addUser(newUser);
      message.info(msg);
    } else {
      message.error("這個帳號已有人使用");
    }
    onSignUpClick();
  };
  
  return (
    <Card >
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        size="large"
      />
      <br />
      <br />
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
      <Select
        onChange={(value) => setDormitory(value)}
        style={{ width: 320 }}
        size="large"
        placeholder="Enter your dormitory"
      >
        {dormitories_node}
      </Select>
      <br />
      <br />
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter your room"
        size="large"
      />
      <br />
      <br />
      <Select
        onChange={(value) => setVaccine1(value)}
        style={{ width: 320 }}
        size="large"
        placeholder="Enter your first dose"
      >
        {vaccines_node}
      </Select>
      <br />
      <br />
      <Select
        onChange={(value) => setVaccine2(value)}
        style={{ width: 320 }}
        size="large"
        placeholder="Enter your second dose"
      >
        {vaccines_node}
      </Select>
      <br />
      <br />
      <Select
        onChange={(value) => setVaccine3(value)}
        style={{ width: 320 }}
        size="large"
        placeholder="Enter your third dose"
      >
        {vaccines_node}
      </Select>
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