import React from "react";
import { InputNumber } from 'antd';
import { getFootprint, getConfirmedUserKeys } from "../../../server/api";
import FootprintTable from "./table";

const Footprint = () => {
  const [today, setToday] = React.useState(new Date());
  const [dayInterval, setDayInterval] = React.useState(7);
  const [rawData, setRawData] = React.useState([]);
  const [dateFootprints, setDateFootprints] = React.useState({});

  React.useEffect(() => {
    async function awaitFootprint() {
      const response = await getFootprint();
      const confirmedUserKeys = await getConfirmedUserKeys();
      setRawData(response.filter(res => confirmedUserKeys.includes(res.userKey) ));
    }
    awaitFootprint();
  }, []);

  React.useEffect(() => {
    let filteredData = rawData.filter(data => isWithinInterval(data));
    let dict = {};
    /* Show the recent data first.*/
    for (let i = filteredData.length - 1; i >= 0; i--) {
      const data = filteredData[i];
      if (dict[data.date] === undefined) {
        dict[data.date] = [];
      }
      dict[data.date].push({
        "time": data.time,
        "location": data.location,
        "note": data.note,
        "key": data.key
      });
    }
    setDateFootprints(dict);
  }, [rawData, dayInterval]);

  function isWithinInterval(fp) {
    let date = new Date(fp.date);  
    return date > (today - dayInterval * 86400000);
  }

  return (
    <>
      <InputNumber 
      min={1} max={31} 
      addonBefore={"顯示"}
      addonAfter={"天內資料"}
      defaultValue={dayInterval} 
      onChange={(val) => {setDayInterval(val);}} />
      
      <FootprintTable dateFootprints={dateFootprints} />
    </>
  );
};

export default Footprint;
