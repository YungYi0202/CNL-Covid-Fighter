import React from 'react';
import { Card, Button, Radio, Steps, Popover } from "antd";
import { updateUser } from "../../server/api";

const { Step } = Steps;

const customDot = (dot, { status, index }) => (
  <Popover>
    {dot}
  </Popover>
);

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
  const [stepsNode, setStepsNode] = React.useState([]);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    const tmp = [];
    const today = new Date();
    for (const [key, value] of Object.entries(user.antigen_test)) {
      const diffDays = Math.ceil((today - new Date(key)) / (1000 * 60 * 60 * 24));
      if (diffDays <= 31) {
        tmp.push(<Step title={value} description={key} />);
      }
    }
    setStepsNode(tmp);
  }, [user]);

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
      updatedUser = { ...user };
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
      <Steps current={3} progressDot={customDot}>
        {stepsNode}
      </Steps>
      <br />
      <br />
      <Button onClick={back}> Back </Button>
    </>
  );
};

export default AntigenTest;