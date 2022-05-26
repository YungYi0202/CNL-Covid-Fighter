import React from "react";
import { Menu, Button } from "antd";
import { updateUser } from "../../server/api";
import Info from "../page/info";
import Confirmed from "../page/confirmed";

const status = [
  {
    label: "healthy",
    key: "healthy"
  },
  {
    label: "confirmed",
    key: "confirmed"
  },
  {
    label: "Stay-at-home order",
    key: "Stay-at-home order"
  },
  {
    label: "Self-quarantine",
    key: "Self-quarantine"
  },
  {
    label: "Self-health monitoring",
    key: "Self-health monitoring"
  },
  {
    label: "Rapid test negative",
    key: "Rapid test negative"
  }
];

const Status = ({ user, setUser, handleLogoutClick }) => {
  const [username, setUsername] = React.useState(user.username);
  const [current_status, setCurrentStatus] = React.useState(user.status);

  React.useEffect(() => {
    async function awaitConfirmedRooms() {
      console.log({ ...user, status: current_status });
      await updateUser({ ...user, status: current_status });
    }
    awaitConfirmedRooms();
  });

  const onClick = (e) => {
    console.log("click ", e);
    setCurrentStatus(e.key);
    setUser((prevState) => ({ ...prevState, status: e.key }));
  };

  return (
    <>
      <h1> 歡迎，{username}！你當前的狀態為： {current_status} </h1>
      <Menu
        onClick={onClick}
        selectedKeys={[current_status]}
        mode="inline"
        items={status}
      />
      <br />
      <br />
      {current_status === "healthy" ? (
        <Info />
      ) : current_status === "confirmed" ? (
        <Confirmed />
      ) : current_status === "Stay-at-home order" ? (
        <Info />
      ) : current_status === "Self-quarantine" ? (
        <Info />
      ) : current_status === "Self-health monitoring" ? (
        <Info />
      ) : current_status === "Rapid test negative" ? (
        <Info />
      ) : (
        <h1> Why???? </h1>
      )}
      <br />
      <br />
      <Button onClick={handleLogoutClick}> Logout </Button>
    </>
  );
};

export default Status;
