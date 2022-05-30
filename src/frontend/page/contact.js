import React from "react";
import { DatePicker, message, Button } from "antd";
import { updateUser } from "../../server/api";

const Contact = ({ user, setUser, back }) => {
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
      statuses_tmp[date] = "確診者同住親友、同寢室";
      const updatedUser = { ...user, is_contacts: true, contact_date: date, statuses: statuses_tmp };
      setUser(updatedUser);
      const [msg] = await updateUser(updatedUser);
      back();
    }
  };

  return (
    <>
      <label> 最後接觸日期: </label>
      <DatePicker onChange={handleDateChange} allowClear={false} />
      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}submit{" "}
      </Button>
    </>
  );
};

export default Contact;