import React from "react";
import { Menu, Button } from "antd";
import Info from "../page/info";
import Confirmed from "../page/confirmed";
import Contact from "../page/contact";

const situation = [
  {
    label: "confirmed",
    key: "confirmed"
  },
  {
    label: "is_contact",
    key: "is_contact"
  }
];

const Status = ({ user, setUser, handleLogoutClick }) => {
  const [username, setUsername] = React.useState(user.username);
  const [report, setReport] = React.useState(false);
  const [current_situation, setCurrentSituation] = React.useState("confirmed");

  const onClick = (e) => {
    setCurrentSituation(e.key);
  };

  const handleReportClick = () => {
    setReport(true);
  };

  const handleNotReportClick = () => {
    setReport(false);
  };

  const back = () => {
    setReport(false);
  };

  return (
    <>
      <h1> 歡迎，{username}！你當前的狀態為： {user.status} </h1>
      {report === true ? (
        <>
          <Menu
            onClick={onClick}
            selectedKeys={[current_situation]}
            mode="inline"
            items={situation}
          />
          <br />
          <br />
          {current_situation === "confirmed" ? (
            <Confirmed user={user} setUser={setUser} back={back} />
          ) : current_situation === "is_contact" ? (
            <Contact user={user} setUser={setUser} back={back} />
          ) : (
            <h1> Should not come to this page... </h1>
          )}
          <br />
          <br />
          <Button onClick={handleNotReportClick}> Back </Button>
        </>
      ) : (
        <Button onClick={handleReportClick}> 我要通報確診 / 密切接觸者 </Button>
      )}
      <br />
      <br />
      <Button onClick={handleLogoutClick}> Logout </Button>
    </>
  );
};

export default Status;
