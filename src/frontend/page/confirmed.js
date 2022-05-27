import React from "react";
import { DatePicker, message, Button } from "antd";
import { updateUser } from "../../server/api";

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
      setUser({ ...user, confirmed: true, confirmed_date: date })
      const [msg] = await updateUser(user);
      back();
    }
  };

  return (
    <>
      <label> PCR / 快篩陽性時間: </label>
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