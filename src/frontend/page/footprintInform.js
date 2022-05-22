import React from "react";
import { TimePicker, DatePicker, Input, message, Button, Mentions } from "antd";
import { addFootprint, getLocationOptions } from "../../backend/data";
import { isEmpty } from "../utils/utils";

const { Option } = Mentions;

const FootprintInform = ({ user, setUser }) => {
  const [date, setDate] = React.useState("");
  const [timePrev, setTimePrev] = React.useState("");
  const [timeNext, setTimeNext] = React.useState("");
  const [userKey, setUserKey] = React.useState(
    isEmpty(user) ? "-1" : user.key
  );
  const [location, setLocation] = React.useState("");
  const [note, setNote] = React.useState("");
  const [allLocationOptions, setAllLocationOptions] = React.useState([]);
  const [curLocationOptions, setCurLocationOptions] = React.useState([]);

  React.useEffect(() => {
    async function awaitAllLocationOptions() {
      const response = await getLocationOptions();
      setAllLocationOptions(response);
      setCurLocationOptions(response);
    }
    awaitAllLocationOptions();
  }, []);

  React.useEffect(() => {
    setCurLocationOptions(allLocationOptions.filter(l => l.includes(location)));
  }, [location]);

  const handleSubmitClick = async () => {
    if (date==="") {
      message.error("請輸入日期");
    }
    else if (timePrev === "" ||timeNext === "") {
      message.error("請輸入時段");
    }
    else if (location === "") {
      message.error("請輸入地點");
    }
    else {
      message.info("Submit!");
      let time = timePrev === timeNext ? timePrev : timePrev + "-" + timeNext;
      await addFootprint({
        "date": date,
        "userKey": userKey,
        "time": time, 
        "location": location,
        "note": note,
        "inCsie": (location.includes("德田") || location.includes("資工"))
      });
      
    }
  };


  function handleDateChange(e) {
    if (e) {
      message.info("Select " + e.format("YYYY/MM/DD"));
      setDate(e.format("YYYY/MM/DD"));
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
  
  return (
    <>
      <h1> 日期 </h1>
      <DatePicker onChange={handleDateChange} allowClear={false} />
      
      <h1> 時段 </h1>
      <TimePicker.RangePicker
        onChange={handleTimeChange}
        format="HH:mm"
        allowClear={false}
      />
      
      <h1> 地點 </h1>
      <Mentions
        onChange={setLocation}
        onSelect={(e) => {setLocation(e.value)}}
        value={location}
        prefix=""
      >
        {curLocationOptions.map(option => 
          <Option value={option}>{option}</Option>
        )}
      </Mentions>

      <h1> 備註 </h1>
      <Input 
      placeholder="例：樓層、教室" 
      onChange={(e) => {setNote(e.target.value);}}
      />
      <br />
      <br />
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}Submit{" "}
      </Button>
    </>
  );
};
export default FootprintInform;
