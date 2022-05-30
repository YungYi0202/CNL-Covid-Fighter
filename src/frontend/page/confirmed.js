import React from "react";
import { DatePicker, message, Button, Upload } from "antd";
import { updateUser, addConfirmedRooms, sendEmailToContacts, updateContactsAfterConfirmed } from "../../server/api";

const Confirmed = ({ user, setUser, back }) => {
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
      statuses_tmp[date] = "快篩陽性";
      const updatedUser = { ...user, confirmed: true, confirmed_date: date, recover_date: "", statuses: statuses_tmp };
      updatedUser.antigen_test[date] = "positive";
      setUser(updatedUser);
      await sendEmailToContacts(updatedUser);
      await updateContactsAfterConfirmed(updatedUser);
      const [msg] = await updateUser(updatedUser);
      back();
      addConfirmedRooms({"dormitory": user.dormitory, "room": user.room, "date": date, "userKey": user.key, "recoverNegative": false});
    }
  };

  return (
    <>
      <label> 確診日期: </label>
      <DatePicker onChange={handleDateChange} allowClear={false} />
      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}submit{" "}
      </Button>
    </>
  );
};

export default Confirmed;