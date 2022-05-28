import React from "react";
import { Button } from "antd";
import Report from "../page/report"


const Status = ({ user, setUser, handleLogoutClick }) => {
  const [report, setReport] = React.useState(false);

  const handleReportClick = () => {
    setReport(true);
  };

  const back = () => {
    setReport(false);
  };

  return (
    <>
      <h1> 歡迎，{user.username}！你當前的狀態為： {user.status} </h1>
      {report === true ? (
        <Report user={user} setUser={setUser} back={back}/>
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
