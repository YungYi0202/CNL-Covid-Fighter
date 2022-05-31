import React from 'react';
import { Radio, Steps, Popover, DatePicker, message, Tooltip, Modal } from "antd";
import { updateUser } from "../../server/api";
import { DeleteOutlined } from '@ant-design/icons';

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
  // const [stepsNode, setStepsNode] = React.useState([]);
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

  const updateUserStatus = async (updatedUser) => {
    const orderedDate = Object.keys(updatedUser.antigen_test).sort(function (a, b) {
      a = a.split('/').join('');
      b = b.split('/').join('');
      return a > b ? -1 : a < b ? 1 : 0;
    });
    let latest = orderedDate.findIndex((e) => updatedUser.antigen_test[e] === "positive");
    const today = new Date();
    if (user.confirmed) {
      if (latest === -1) {
        updatedUser = {
          ...user,
          confirmed: false,
          confirmed_date: "",
          recover_date: ""
        };
      } else {
        latest = new Date(orderedDate[latest]);
        const diffDays = Math.ceil((today - latest) / (1000 * 60 * 60 * 24)) > 14;
        if (diffDays > 14) {
          const recover_date = new Date();
          recover_date.setDate(latest.getDate() + 14);
          updatedUser = {
            ...user,
            confirmed: false,
            confirmed_date: "",
            recover_date: formatDate(recover_date)
          };
        }
      }
    } else {
      latest = new Date(orderedDate[latest]);
      if (Math.ceil((today - latest) / (1000 * 60 * 60 * 24)) <= 14) {
        updatedUser = {
          ...user,
          confirmed: true,
          confirmed_date: formatDate(latest),
          recover_date: ""
        };
      }
    }
    setUser(updatedUser);
    await updateUser(updatedUser);
  }

  const onDeleteClick = async (e) => {
    const updatedUser = { ...user };
    delete updatedUser.antigen_test[e];
    await updateUserStatus(updatedUser);
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