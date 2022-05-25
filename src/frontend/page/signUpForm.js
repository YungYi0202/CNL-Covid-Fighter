import { Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


const SignUpForm = ({ setAccount, setPassword, handleSubmitClick }) => {
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
      <Button block type="primary" onClick={handleSubmitClick}>
        {" "}
        Sign up{" "}
      </Button>
    </Card>
  );
};

export default SignUpForm;