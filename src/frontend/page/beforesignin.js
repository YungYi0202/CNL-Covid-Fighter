import React from "react";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getCSIEFootprint } from "../../backend/data";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Left = styled.div`
  width: 30%;
  margin: 20px 0px 10px 0px;
  text-align: center;
  vertical-align: top;
  display: inline-block;
`;

const Right = styled.div`
  background-color: grey;
  width: 65%;
  margin: 20px 0px 10px 5%;
  text-align: left;
  display: inline-block;
`;

const BeforeSignin = ({ setAccount, setPassword, handleSubmitClick }) => {
  const [csiefootprints, setcsieFootprints] = React.useState([]);

  React.useEffect(() => {
    async function awaitcsieFootprint() {
      const tmp = await getCSIEFootprint();
      console.log(tmp);
      setcsieFootprints(tmp);
    }
    awaitcsieFootprint();
  }, []);

  return (
    <>
      <Left>
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
          Submit{" "}
        </Button>
      </Left>
      <Right>
        <h1 style={{ color: "#FFFFFF" }}> 系館確診足跡 </h1>
        {csiefootprints.map((date, i) =>
          date.places.length !== 0 ? (
            <>
              <h1 style={{ color: "#FFFFFF" }}> {date.key} </h1>
              {date.places.map((room) => (
                <h2 style={{ color: "#FFFFFF" }}> {room} </h2>
              ))}{" "}
            </>
          ) : (
            <></>
          )
        )}
        <h1 style={{ color: "#FFFFFF" }}> TODO: map </h1>
      </Right>
    </>
  );
};

export default BeforeSignin;
