import React from "react";
import { Menu, Button, Card } from "antd";
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

const Report = ({ user, setUser, back }) => {
  const onClick = (e) => {
    setCurrentSituation(e.key);
  };

  const [current_situation, setCurrentSituation] = React.useState("confirmed");

  return (
    <>
      <Card>
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
      </Card>
      <br />
      <br />
      <Button onClick={back}> Back </Button>
    </>
  );
};

export default Report;