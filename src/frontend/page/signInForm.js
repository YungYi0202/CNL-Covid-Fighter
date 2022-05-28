import { Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


const SignInForm = ({ setAccount, setPassword, handleSubmitClick, setCurrent}) => {
  return (
    <Card >
      <Input
        prefix={<UserOutlined />}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="帳號"
        size="large"
      />
      <br />
      <br />
      <Input.Password
        prefix={<UserOutlined />}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密碼"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        size="large"
      />
      
      <br />
      <Button block type="link" onClick={() => setCurrent("signup")}>
      沒有帳號？註冊一個
      </Button>
      <br />
      <br />
      <Button block type="primary" onClick={handleSubmitClick}>
        {" "}登入{" "}
      </Button>
    </Card>
  );
};

export default SignInForm;