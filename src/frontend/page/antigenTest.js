import React from 'react';
import { Card, Button, Radio } from "antd";
import { updateUser } from "../../server/api";

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('/');
}

const AntigenTest = ({ user, setUser, back }) => {
  const [value, setValue] = React.useState("negative");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = async () => {
    let updatedUser = {}
    const today = formatDate(new Date());
    if (value === "positive" && !user.confirmed) {
      updatedUser = {
        ...user,
        confirmed: true,
        confirmed_date: today,
        recover_date: ""
      };
      setUser(updatedUser);
    } else if (value === "negative" && user.confirmed) {
      updatedUser = {
        ...user,
        confirmed: false,
        confirmed_date: "",
        recover_date: today
      };
      setUser(updatedUser);
    } else {
      updateUser = {...user};
    }
    updatedUser.antigen_test[today] = value;
    await updateUser(updatedUser);
  };

  return (
    <>
      <Card style={{
        marginTop: "20px",
        background: "#f0f0f0",
        borderColor: "#bebebe"
      }}>
        <h>今天快篩：</h>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={"positive"}>陽性</Radio>
          <Radio value={"negative"}>陰性</Radio>
        </Radio.Group>
        <Button onClick={onSubmit}>
          {" "}submit{" "}
        </Button>
      </Card>
      <br />
      <br />
      <Button onClick={back}> Back </Button>
    </>
  );
};

export default AntigenTest;