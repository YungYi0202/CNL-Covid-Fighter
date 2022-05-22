import React from "react";
import { Button } from "antd";
import styled from "styled-components";

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

const AfterSignin = ({ username, handleLogoutClick, text }) => {
  return (
    <>
      <Left>
        <h1> 歡迎，{username} </h1>
        <Button onClick={handleLogoutClick}> Logout </Button>
      </Left>
      <Right>
        {text.map((t) => (
          <h1> {t} </h1>
        ))}
      </Right>
    </>
  );
};

export default AfterSignin;
