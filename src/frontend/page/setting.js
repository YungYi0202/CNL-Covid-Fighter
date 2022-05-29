import React from "react";
import { Input, Button, Card, Select, Form, message } from "antd";
import { UserOutlined} from "@ant-design/icons";
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

const dormitoriesNode = [];
function add_dorm_option(dorm) {
  dormitoriesNode.push(<Option value={dorm["key"]}>{dorm["label"]}</Option>);
}
dormitories.forEach(add_dorm_option);

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

const disabledSelector = <Select size="large" disabled></Select>;

const vaccinesNode = [];
function add_vaccine_option(vaccine) {
  vaccinesNode.push(<Option value={vaccine["key"]}>{vaccine["label"]}</Option>);
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
  const [allowRoom, setAllowRoom] = React.useState(user.room===""?false: true);
  const [allowVaccine2, setAllowVaccine2] = React.useState(vaccine2===""?false: true);
  const [allowVaccine3, setAllowVaccine3] = React.useState(vaccine3===""?false: true);

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
  
  const handleUpdateClick = async () => {
    let doses = [vaccine1, vaccine2, vaccine3];
    doses.filter(dose => dose !== "" && dose !== "尚未接種");

    const newUser = {
      ...user,
      password: password,
      username: username,
      email: email,
      dormitory: dormitory,
      room: room,
      vaccine: {"num_doses": doses.length, "doses": doses}
    };
    setUser(newUser);
    const [msg] = await updateUser(newUser);
    message.info(msg);
  };

  return (
    <Card >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="使用者名稱">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            size="large"
            defaultValue={username}
          />
        </Form.Item>
        <Form.Item label="密碼">
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            size="large"
            defaultValue={password}
          />
        </Form.Item>
        <Form.Item label="電子郵件">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            defaultValue={email}
          />
        </Form.Item>
        <Form.Item label="宿舍">
          <Select
            onChange={(value) => setDormitory(value)}
            size="large"
            defaultValue={dormitory}
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
              defaultValue={room}
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
    
      <Button block type="primary" onClick={handleUpdateClick}>
      更新
      </Button>
    </Card>
  );
};

export default Setting;