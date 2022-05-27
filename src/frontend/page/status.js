import React from "react";
import { Menu, Button} from "antd";
import Info from "../page/info";
import Confirmed from "../page/confirmed";

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
  const [current_situation, setCurrentSituation] = React.useState("");

  const onClick = (e) => {
    setCurrentSituation(e.key);
  };

  return (
    <>
      <h1> 歡迎，{username}！你當前的狀態為： {user.status} </h1>
      <Menu
        onClick={onClick}
        mode="inline"
        items={situation}
      />
      <br />
      <br />
      {current_situation === "confirmed" ? (
        <Confirmed />
      ) : current_situation === "is_contact" ? (
        <Info />
      ) : (
        <h1> 你很健康！ </h1>
      )}
      <br />
      <br />
      <Button onClick={handleLogoutClick}> Logout </Button>
    </>
  );
};

export default Status;
