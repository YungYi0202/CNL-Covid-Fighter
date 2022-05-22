import React from "react";
import { DatePicker, Menu, Dropdown, message, Button, InputNumber } from "antd";
import { addConfirmedRooms } from "../../backend/data";

const { RangePicker } = DatePicker;

const RoomInform = () => {
  const [dormitory, setDormitory] = React.useState("select");
  const [room, setRoom] = React.useState(0);
  const [datePrev, setDatePrev] = React.useState("");
  const [dateNext, setDateNext] = React.useState("");

  const handleSubmitClick = async () => {
    if (
      room === "" ||
      dormitory === "select" ||
      datePrev === "" ||
      dateNext === ""
    )
      message.error("Error!");
    else {
      message.info("Submit!");
      let date = datePrev === dateNext ? datePrev : datePrev + "-" + dateNext;
      await addConfirmedRooms({
        label: dormitory,
        rooms: [date + " " + room + "室"],
        key: dormitory
      });
    }
  };

  function handleDormitoryClick(e) {
    if (e) {
      message.info("Select " + e.key);
      setDormitory(e.key);
    } else {
      setDormitory("select");
    }
  }

  function handleInputNumber(e) {
    if (e) {
      message.info("Input " + e);
      setRoom(e);
    } else {
      setRoom(0);
    }
  }

  function handleDateChange(e) {
    if (e) {
      message.info("Select " + e.key);
      setDatePrev(e[0].format("MM/DD"));
      setDateNext(e[1].format("MM/DD"));
    } else {
      setDatePrev("");
      setDateNext("");
    }
  }

  const dormitories = (
    <Menu
      onClick={handleDormitoryClick}
      items={[
        {
          label: "男一舍",
          key: "男一舍"
        },
        {
          label: "男二舍",
          key: "男二舍"
        },
        {
          label: "男三舍",
          key: "男三舍"
        },
        {
          label: "男四舍",
          key: "男四舍"
        },
        {
          label: "男五舍",
          key: "男五舍"
        },
        {
          label: "男六舍",
          key: "男六舍"
        },
        {
          label: "男七舍",
          key: "男七舍"
        },
        {
          label: "男八舍",
          key: "男八舍"
        },
        {
          label: "研一男舍",
          key: "研一男舍"
        },
        {
          label: "研一女舍",
          key: "研一女舍"
        },
        {
          label: "研三舍",
          key: "研三舍"
        },
        {
          label: "大一女舍",
          key: "大一女舍"
        },
        {
          label: "女一舍",
          key: "女一舍"
        },
        {
          label: "女二舍",
          key: "女二舍"
        },
        {
          label: "女三舍",
          key: "女三舍"
        },
        {
          label: "女四舍",
          key: "女四舍"
        },
        {
          label: "女五舍",
          key: "女五舍"
        },
        {
          label: "女六舍",
          key: "女六舍"
        },
        {
          label: "女八舍",
          key: "女八舍"
        },
        {
          label: "女九舍",
          key: "女九舍"
        }
      ]}
    />
  );

  return (
    <>
      <h1> Dormitory </h1>
      <Dropdown.Button overlay={dormitories}>{dormitory}</Dropdown.Button>
      <h1> Room </h1>
      <InputNumber onChange={handleInputNumber} placeholder="enter" />
      <h1> Date </h1>
      <RangePicker onChange={handleDateChange} allowClear={false} />

      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}
        Submit{" "}
      </Button>
      <br />
      <h1>
        看通報成功要不要跳出「通報成功」 如何防止別人亂填？
        （這個老師有特別提出但我覺得防不了因為我們拿不到誰住那裡的資訊）
      </h1>
    </>
  );
};
export default RoomInform;
