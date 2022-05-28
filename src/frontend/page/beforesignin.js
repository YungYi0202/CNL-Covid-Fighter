import React from "react";
import styled from "styled-components";
import { getFootprint, getEverConfirmedUsers } from "../../server/api";
import { getDateFootprint } from "../utils/utils"
import FootprintTable from "./footprint/table"
import SignInForm from "./signInForm";
import SignUpForm from "./signUpForm";
import { Button } from "antd";

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
  const [current, setCurrent] = React.useState("none");
  const [csiefootprints, setCsieFootprints] = React.useState({});

  React.useEffect(() => {
    async function awaitcsieFootprint() {
      const rawData = await getFootprint();
      const users = await getEverConfirmedUsers();
      const userKeys = users.map(user => user.key);
      const filteredData = rawData.filter(fp => fp.inCsie && userKeys.includes(fp.userKey));
      setCsieFootprints(getDateFootprint(filteredData));
    }
    awaitcsieFootprint();
  }, []);

  const onSignUpClick = () => {
    console.log("here");
    setCurrent("none");
  }

  return (
    <>
      <Left>
        {current === "none" ? (
          <div>
            <Button block type="primary" onClick={() => setCurrent("signin")}>
              {" "}登入{" "}
            </Button>
            <br />
            <br />
            <Button block type="primary" onClick={() => setCurrent("signup")}>
              {" "}註冊{" "}
            </Button>
          </div>
        ) : current === "signin" ? (
          <SignInForm
            setAccount={setAccount}
            setPassword={setPassword}
            handleSubmitClick={handleSubmitClick}
            setCurrent={setCurrent}
          />
        ) : current === "signup" ? (
          <SignUpForm
            onSignUpClick={onSignUpClick}
            setCurrent={setCurrent}
          />
        ) : (
          <h1> Why???? </h1>
        )}

      </Left>
      <Right>
        <h1> 系館確診足跡 </h1>
        <FootprintTable dateFootprints={csiefootprints} />
      </Right>
    </>
  );
};

export default BeforeSignin;
