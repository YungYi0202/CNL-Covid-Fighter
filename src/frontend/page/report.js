import React from "react";
import { Select, Modal } from "antd";
import Confirmed from "../page/confirmed";
import Contact from "../page/contact";
import Entrant from "../page/entrant";

const { Option } = Select;
const situations = [
  {
    label: "確診者",
    key: "confirmed"
  },
  {
    label: "入境者",
    key: "entrant"
  },
  {
    label: "密切接觸者",
    key: "is_contacts"
  },
  {
    label: "確診者的密切接觸者的接觸者",
    key: "contact_of_contacts"
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
      <Modal title="通報身份" visible={true} onCancel={back} okButtonProps={{style:{ display:'none' }}} cancelButtonProps={{style:{ display:'none' }}}>
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
        ) : current_situation === "is_contacts" ? (
          <Contact user={user} setUser={setUser} back={back} />
        ) : current_situation === "entrant" ? (
          <Entrant user={user} setUser={setUser} back={back} />
        ) : current_situation === "contact_of_contacts" ? (
          <Contact user={user} setUser={setUser} back={back} />
        ) : (
          <h1> Should not come to this page... </h1>
        )}
      </Modal>
    </>
  );
};

export default Report;