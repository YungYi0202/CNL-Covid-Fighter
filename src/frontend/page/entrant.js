import React from "react";
import { DatePicker, message, Button } from "antd";
import { updateUser } from "../../server/api";

const Entrant = ({ user, setUser, back }) => {
  const [date, setDate] = React.useState("");
  
  function handleDateChange(e) {
    if (e) {
      // message.info("Select " + e.format("YYYY/MM/DD"));
      setDate(e.format("YYYY/MM/DD"));
    } else {
      setDate("");
    }
  }

  const handleSubmitClick = async () => {
    if (date==="") {
      message.error("請輸入日期");
    }
    else {
      let statuses_tmp = { ...user.statuses };
      statuses_tmp[date] = "入境者";
      const updatedUser = { ...user, entrant: true, entry_date: date, statuses: statuses_tmp };
      setUser(updatedUser);
      const [msg] = await updateUser(updatedUser);
      back();
    }
  };

  return (
    <>
      <label> 入境日期: </label>
      <DatePicker onChange={handleDateChange} allowClear={false} />
      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}submit{" "}
      </Button>
    </>
  );
};

export default Entrant;