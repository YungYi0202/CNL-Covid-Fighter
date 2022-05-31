import React from 'react';
import { Radio, DatePicker, message, Tooltip, Modal } from "antd";

const AntigenTest = ({ user, setUser, back, updateUserStatus }) => {
  const [value, setValue] = React.useState("negative");
  const [date, setDate] = React.useState("");

  function handleDateChange(e) {
    if (e) {
      setDate(e.format("YYYY/MM/DD"));
    } else {
      setDate("");
    }
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = async () => {
    if (date === "") {
      message.error("請輸入日期");
    } else {
      let updatedUser = { ...user };
      updatedUser.antigen_test[date] = value;
      await updateUserStatus(updatedUser);
    }
  };

  return (
    <>
      <Modal title="登記快篩資訊" visible={true} onCancel={back} onOk={onSubmit} okText="登記" cancelText="取消">
        <label>快篩結果：</label>
        <DatePicker onChange={handleDateChange} allowClear={false} style={{ marginLeft: "10px", marginRight: "10px" }} />
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={"positive"}>陽性</Radio>
          <Radio value={"negative"}>陰性</Radio>
        </Radio.Group>
      </Modal>
    </>
  );
};

export default AntigenTest;