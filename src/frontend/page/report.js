import React from "react";
import { Button, Card, Select } from "antd";
import Confirmed from "../page/confirmed";
import Contact from "../page/contact";

const { Option } = Select;
const situations = [
  {
    label: "confirmed",
    key: "confirmed"
  },
  {
    label: "is_contact",
    key: "is_contact"
  }
];

const situations_node = [];
function add_situation_option(situation) {
  situations_node.push(<Option value={situation["key"]}>{situation["label"]}</Option>);
}
situations.forEach(add_situation_option);

const Report = ({ user, setUser, back }) => {
  const [current_situation, setCurrentSituation] = React.useState("confirmed");

  return (
    <>
      <Card>
        <Select
          onChange={(value) => setCurrentSituation(value)}
          style={{ width: 300 }}
          size="large"
          defaultValue={current_situation}
        >
          {situations_node}
        </Select>
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