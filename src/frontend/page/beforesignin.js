import React from "react";
import { Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getFootprint } from "../../server/api";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {getDateFootprint} from "../utils/utils"
import FootprintTable from "./footprint/table"



const Left = styled.div`
  width: 30%;
  margin: 20px 0px 10px 0px;
  text-align: center;
  vertical-align: top;
  display: inline-block;
`;

const Right = styled.div`
  width: 65%;
  margin: 20px 0px 10px 5%;
  text-align: left;
  display: inline-block;
`;

const BeforeSignin = ({ setAccount, setPassword, handleSubmitClick }) => {
  const [csiefootprints, setCsieFootprints] = React.useState({});

  React.useEffect(() => {
    async function awaitcsieFootprint() {
      const rawData = await getFootprint();
      const filteredData = rawData.filter(fp=>fp.inCsie);
      setCsieFootprints(getDateFootprint(filteredData));
    }
    awaitcsieFootprint();
  }, []);

  return (
    <>
      <Left>
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
            Submit{" "}
          </Button>
        </Card>
      </Left>
      <Right>
        <h1> 系館確診足跡 </h1>
        <FootprintTable dateFootprints={csiefootprints}/>
      </Right>
    </>
  );
};

export default BeforeSignin;
