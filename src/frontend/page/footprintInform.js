import React from "react";
import { TimePicker, DatePicker, Menu, Dropdown, message, Button } from "antd";
import { addFootprint, addCSIEFootprint } from "../../backend/data";

const RoomList = () => {
  const [building, setBuilding] = React.useState("select");
  const [classroom, setClassroom] = React.useState("select");
  const [date, setDate] = React.useState("");
  const [timePrev, setTimePrev] = React.useState("");
  const [timeNext, setTimeNext] = React.useState("");

  const handleSubmitClick = async () => {
    if (
      classroom === "select" ||
      (classroom === "德田館" && building === "select") ||
      timePrev === "" ||
      timeNext === ""
    )
      message.error("Error!");
    else {
      message.info("Submit!");
      let time = timePrev === timeNext ? timePrev : timePrev + "-" + timeNext;
      await addFootprint({
        date: date,
        places: [
          time + " " + building + (building === "德田館" ? " " + classroom : "")
        ],
        key: date
      });
      if (building === "德田館")
        await addCSIEFootprint({
          date: date,
          places: [time + " " + classroom],
          key: date
        });
    }
  };

  function handleBuildingClick(e) {
    if (e) {
      message.info("Select " + e.key);
      setBuilding(e.key);
    } else {
      setBuilding("select");
    }
  }

  function handleClassroomClick(e) {
    if (e) {
      message.info("Select " + e.key);
      setClassroom(e.key);
    } else {
      setClassroom("select");
    }
  }

  function handleDateChange(e) {
    if (e) {
      message.info("Select " + e.format("MM/DD"));
      setDate(e.format("MM/DD"));
    } else {
      setDate("");
    }
  }

  function handleTimeChange(e) {
    if (e) {
      message.info(
        "Select " + e[0].format("HH:mm") + "-" + e[1].format("HH:mm")
      );
      setTimePrev(e[0].format("HH:mm"));
      setTimeNext(e[1].format("HH:mm"));
    } else {
      setTimePrev("");
      setTimeNext("");
    }
  }

  const buildings = (
    <Menu
      onClick={handleBuildingClick}
      items={[
        {
          label: "德田館",
          key: "德田館"
        },
        {
          label: "非德田館",
          key: "非德田館"
        }
      ]}
    />
  );

  const classrooms = (
    <Menu
      onClick={handleClassroomClick}
      items={[
        {
          label: "新館",
          key: "新館"
        },
        {
          label: "非新館",
          key: "非新館"
        }
      ]}
    />
  );

  return (
    <>
      <h1> Building </h1>
      <Dropdown.Button overlay={buildings}>{building}</Dropdown.Button>
      <h1> Classroom </h1>
      <Dropdown.Button overlay={classrooms}>{classroom}</Dropdown.Button>
      <h1> Date </h1>
      <DatePicker onChange={handleDateChange} allowClear={false} />
      <h1> Time </h1>
      <TimePicker.RangePicker
        onChange={handleTimeChange}
        format="HH:mm"
        allowClear={false}
      />
      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}
        Submit{" "}
      </Button>
    </>
  );
};
export default RoomList;
