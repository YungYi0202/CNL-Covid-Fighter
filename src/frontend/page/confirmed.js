import React from "react";
import { DatePicker, message, Button, Upload } from "antd";
import { updateUser, addConfirmedRooms } from "../../server/api";

const Confirmed = ({ user, setUser, back }) => {
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
      const updatedUser = { ...user, confirmed: true, confirmed_date: date, recover_date: "" };
      setUser(updatedUser);
      const [msg] = await updateUser(updatedUser);
      back();
      addConfirmedRooms({"dormitory": user.dormitory, "room": user.room, "date": date, "userKey": user.key, "recoverNegative": false});
    }
  };

  return (
    <>
      <label> PCR / 快篩陽性日期: </label>
      <DatePicker onChange={handleDateChange} allowClear={false} />
      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}submit{" "}
      </Button>
      <br />
      <br />
      <a href="https://www.cdc.gov.tw/Category/MPage/9wonLmQrvAdSAx55Ec7aWw">
        衛福部確診個案自主回報疫調系統
      </a>
      <br />
      <br />
      <a href="https://my.ntu.edu.tw/ntuwdc/ConfirmedReport.aspx">
        臺大確診者通報
      </a>
    </>
  );
};

export default Confirmed;