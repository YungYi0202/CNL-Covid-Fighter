import React from "react";
import { message, Input, Button, Card, Menu, Dropdown, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { updateUser } from "../../server/api";

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

const Setting = ({ user, setUser }) => {
  const [username, setUsername] = React.useState(user.username);
  const [password, setPassword] = React.useState(user.password);
  const [email, setEmail] = React.useState(user.email);
  const [dormitory, setDormitory] = React.useState(user.dormitory);
  const [room, setRoom] = React.useState(user.room);
  const [vaccine1, setVaccine1] = React.useState(user.vaccine.doses[0] ?? "")
  const [vaccine2, setVaccine2] = React.useState(user.vaccine.doses[1] ?? "")
  const [vaccine3, setVaccine3] = React.useState(user.vaccine.doses[2] ?? "")

  const handleUpdateClick = async () => {
    let doses = [vaccine1, vaccine2, vaccine3];
    doses.filter(dose => dose !== "");

    const newUser = {
      "account": user.account,
      "password": password,
      "username": username,
      "text": [],
      "status": user.status,
      "email": email,
      "dormitory": dormitory,
      "room": room,
      "vaccine": {
        "num_doses": doses.length,
        "doses": doses
      },
      "confirmed": user.confirmed,
      "confirmed_date": user.confirmed_date,
      "is_contacts": user.is_contacts,
      "contact_date": user.contact_date,
      "key": user.key
    }
    setUser(newUser);
    const [msg] = await updateUser(newUser);
  };

  return (
    <Card >
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setUsername(e.target.value)}
        defaultValue={username}
        size="large"
      />
      <br />
      <br />
      <Input.Password
        prefix={<UserOutlined />}
        onChange={(e) => setPassword(e.target.value)}
        defaultValue={password}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        size="large"
      />
      <br />
      <br />
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setEmail(e.target.value)}
        defaultValue={email}
        size="large"
      />
      <br />
      <br />
      <Select
        onChange={(value) => setDormitory(value)}
        style={{ width: 1182 }}
        size="large"
        defaultValue={dormitory}
      >
        {dormitories_node}
      </Select>
      <br />
      <br />
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setRoom(e.target.value)}
        defaultValue={room}
        size="large"
      />
      <br />
      <br />
      <Select
        onChange={(value) => setVaccine1(value)}
        style={{ width: 1182 }}
        size="large"
        defaultValue={vaccine1}
        placeholder="Enter your first dose"
      >
        {vaccines_node}
      </Select>
      <br />
      <br />
      <Select
        onChange={(value) => setVaccine2(value)}
        style={{ width: 1182 }}
        size="large"
        defaultValue={vaccine2}
        placeholder="Enter your second dose"
      >
        {vaccines_node}
      </Select>
      <br />
      <br />
      <Select
        onChange={(value) => setVaccine3(value)}
        style={{ width: 1182 }}
        size="large"
        defaultValue={vaccine3}
        placeholder="Enter your third dose"
      >
        {vaccines_node}
      </Select>
      <br />
      <br />
      <Button block type="primary" onClick={handleUpdateClick}>
        {" "}
        update{" "}
      </Button>
    </Card>
  );
};

export default Setting;