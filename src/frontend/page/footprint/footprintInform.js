import React from "react";
import { TimePicker, DatePicker, Input, message, Button, Mentions, Divider, Card, Space} from "antd";
import { addFootprint, getLocationOptions, getFootprint } from "../../../server/api";
import { isEmpty } from "../../utils/utils";
import FootprintTable from "./table";
import { getDateFootprint } from "../../utils/utils";


const { Option } = Mentions;

const FootprintInform = ({ user }) => {
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
  const [dateFootprints, setDateFootprints] = React.useState({});

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

  React.useEffect(() => {
    async function _setDateFootprints() {
      const rawData = await getFootprint();
      const filteredData = rawData.filter(fp => fp.userKey === userKey);
      setDateFootprints(getDateFootprint(filteredData));
    }
    _setDateFootprints();
  }, [userKey]);

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
      let time = timePrev === timeNext ? timePrev : timePrev + "-" + timeNext;
      const newData = {
        "date": date,
        "userKey": userKey,
        "time": time, 
        "location": location,
        "note": note,
        "inCsie": (location.includes("德田") || location.includes("資工"))
      };
      const [msg, key] = await addFootprint(newData);
      message.info(msg);
      if (msg == "success") {
        let dict = dateFootprints;
        dict[date].push({
          "time": time, 
          "location": location,
          "note": note,
          "key": key
        })
      }
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
      <Card>
      <h1>上傳足跡</h1>
      <Space>
      <label>時間:</label>
        <DatePicker onChange={handleDateChange} allowClear={false} />
        <TimePicker.RangePicker
          onChange={handleTimeChange}
          format="HH:mm"
          allowClear={false}
        />
      </Space>
      <br></br>
      <br></br>
      <Space>
      <label>地點:   </label>
        <Mentions
          onChange={setLocation}
          onSelect={(e) => {setLocation(e.value);}}
          value={location}
          prefix=""
        >
          {curLocationOptions.map(option => 
            <Option value={option}>{option}</Option>
          )}
        </Mentions>
      </Space>
      <br></br>
      <br></br>
      <Space>
        <label>備註:   </label>
        <Input 
          placeholder="例：樓層、教室" 
          onChange={(e) => {setNote(e.target.value);}}
        />
      </Space>
      <br></br>
      <br></br>
      <Button onClick={handleSubmitClick} size="large" type="primary">
        {" "}新增{" "}
      </Button>
      </Card>
      <Divider />
      <Card>
      <h1>我的足跡</h1>
      <FootprintTable dateFootprints={dateFootprints} />
      </Card>
    </>
  );
};
export default FootprintInform;
