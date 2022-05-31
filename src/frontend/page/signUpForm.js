import React from "react";
import { message, Input, Button, Card, Select, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { userExist, addUser } from "../../server/api";

const { Option } = Select;
const dormitories =
  [
    {
      label: "無",
      key: "無"
    },
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

const dormitoriesNode = [];
function addDormOptions(dorm) {
  dormitoriesNode.push(<Option value={dorm["key"]}>{dorm["label"]}</Option>);
}
dormitories.forEach(addDormOptions);

const vaccines = [
  {
    label: "尚未接種",
    key: "尚未接種"
  },
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

const vaccinesNode = [];
function addVaccineOptions(vaccine) {
  vaccinesNode.push(<Option value={vaccine["key"]}>{vaccine["label"]}</Option>);
}
vaccines.forEach(addVaccineOptions);

const disabledSelector = <Select size="large" disabled></Select>;

const SignUpForm = ({ onSignUpClick, setCurrent }) => {
  const [username, setUsername] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dormitory, setDormitory] = React.useState("");
  const [allowRoom, setAllowRoom] = React.useState(false);
  const [room, setRoom] = React.useState("");
  const [vaccine1, setVaccine1] = React.useState("");
  const [vaccine2, setVaccine2] = React.useState("");
  const [allowVaccine2, setAllowVaccine2] = React.useState(false);
  const [vaccine3, setVaccine3] = React.useState("");
  const [allowVaccine3, setAllowVaccine3] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSignUpClick = async () => {
    if (account === "" || password === "" || username === "" || dormitory === "" || room === ""|| email === "" || vaccine1 === "") {
      message.error("您有未填欄位");
      return;
    }
    let doses = [vaccine1, vaccine2, vaccine3];
    doses.filter(dose => dose !== "" && dose !== "尚未接種");

    const res = await userExist(account);
    if (!res) {
      const newUser = {
        "account": account,
        "password": password,
        "username": username,
        "text": [],
        "status": "self-health monitoring",
        "dormitory": dormitory,
        "room": room,
        "email": email,
        "vaccine": {
          "num_doses": doses.length,
          "doses": doses
        },
        "confirmed": false,
        "confirmed_date": "",
        "recover_date": "",
        "entrant": false,
        "entry_date": "",
        "is_contacts": false,
        "contact_date": "",
        "contact_of_contacts": false,
        "contact_contacts_date": "",
        "antigen_test": {},
        "key": ""
      };
      const [msg] = await addUser(newUser);
      message.info(msg);
    } else {
      message.error("這個帳號已有人使用");
    }
    onSignUpClick();
  };

  React.useEffect(() => {
    if (vaccine1 === "尚未接種" || vaccine1 === "") {
      setAllowVaccine2(false);
    } else {
      setAllowVaccine2(true);
    }
  }, [vaccine1]);

  React.useEffect(() => {
    if (vaccine2 === "尚未接種" || vaccine2 === "") {
      setAllowVaccine3(false);
    } else {
      setAllowVaccine3(true);
    }
  }, [vaccine2]);

  React.useEffect(() => {
    if (!allowVaccine2) {
      setVaccine2("");
    }
  }, [allowVaccine2]);

  React.useEffect(() => {
    if (!allowVaccine3) {
      setVaccine3("");
    }
  }, [allowVaccine3]);

  React.useEffect(() => {
    if (dormitory === "無" || dormitory === "") {
      setAllowRoom(false);
    } else {
      setAllowRoom(true);
    }
  }, [dormitory]);

  React.useEffect(() => {
    if (!allowRoom) {
      setRoom("");
    }
  }, [allowRoom]);
  
  return (
    <Card >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="使用者名稱">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item label="帳號">
          <Input
            onChange={(e) => setAccount(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item label="密碼">
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
          />
        </Form.Item>
        <Form.Item label="電子郵件">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item label="宿舍">
          <Select
            onChange={(value) => setDormitory(value)}
            size="large"
          >
            {dormitoriesNode}
          </Select>
        </Form.Item>
        <Form.Item label="寢室">
          {
          allowRoom?
            <Input
              onChange={(e) => setRoom(e.target.value)}
              size="large" value={room}
            />
          :
            <Input size="large" disabled/>
          }
        </Form.Item>
        <Form.Item label="第一劑">
          <Select
            onChange={(value) => setVaccine1(value)}
            size="large" value={vaccine1}
          >
            {vaccinesNode}
          </Select>
        </Form.Item>
        <Form.Item label="第二劑">
          {allowVaccine2?
          <Select
            onChange={(value) => setVaccine2(value)}
            size="large" value={vaccine2}
          >
            {vaccinesNode}
          </Select>
          : disabledSelector}
        </Form.Item>
        <Form.Item label="第三劑">
          {allowVaccine3?
          <Select
            onChange={(value) => setVaccine3(value)}
            size="large" value={vaccine3}
          >
            {vaccinesNode}
          </Select>: disabledSelector}
        </Form.Item>
      </Form>
 
      <Button block type="link" onClick={() => setCurrent("signin")}>
      已有帳號？登入
      </Button>
      <br />
      <br />
      <Button block type="primary" onClick={handleSignUpClick}>
        {" "}註冊{" "}
      </Button>
    </Card>
  );
};

export default SignUpForm;