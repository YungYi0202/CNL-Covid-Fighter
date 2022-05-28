import React from "react";
import { DatePicker, message, Button } from "antd";
import { updateUser } from "../../server/api";

const ContactOfContacts = ({ user, setUser, back }) => {
  const [date, setDate] = React.useState("");
  
  function handleDateChange(e) {
    if (e) {
      message.info("Select " + e.format("YYYY/MM/DD"));
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
      const updatedUser = { ...user, contact_of_contacts: true, contact_contacts_date: date };
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

export default ContactOfContacts;