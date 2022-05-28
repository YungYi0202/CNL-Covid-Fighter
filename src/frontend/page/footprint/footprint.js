import React from "react";
import { InputNumber } from 'antd';
import { getFootprint, getEverConfirmedUsers } from "../../../server/api";
import FootprintTable from "./table";
import { getDateFootprint, isDangerDateForUser } from "../../utils/utils";
import styled from "styled-components";

const Middle = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 20px;
`;

const Footprint = () => {
  const [today, setToday] = React.useState(new Date());
  const [dayInterval, setDayInterval] = React.useState(7);
  const [rawData, setRawData] = React.useState([]);
  const [dateFootprints, setDateFootprints] = React.useState({});
  const [incubationPeriod, setIncubationPeriod] = React.useState(7);


  React.useEffect(() => {
    async function awaitFootprint() {
      let fps = await getFootprint();
      const users = await getEverConfirmedUsers();
      const userKeys = users.map(user => user.key);
      fps = fps.filter(fp => userKeys.includes(fp.userKey) && isDangerDateForUser(fp.date, users[fp.userKey], incubationPeriod) );
      setRawData(fps);
    }
    awaitFootprint();
  }, [incubationPeriod]);

  React.useEffect(() => {
    let filteredData = rawData.filter(data => isWithinInterval(data));
    setDateFootprints(getDateFootprint(filteredData));
  }, [rawData, dayInterval]);

  function isWithinInterval(fp) {
    let date = new Date(fp.date);  
    return date > (today - dayInterval * 86400000);
  }

  return (
    <>
      <Middle>
        <InputNumber 
          size="large"
          min={1} max={31} 
          addonBefore={"顯示"}
          addonAfter={"天內資料"}
          defaultValue={dayInterval} 
          onChange={(val) => {setDayInterval(val);}} 
        />
      </Middle>
      <Middle>
        <InputNumber 
          size="large"
          min={0} max={14} 
          addonBefore={"假定淺伏期為"}
          addonAfter={"天"}
          defaultValue={incubationPeriod} 
          onChange={(val) => {setIncubationPeriod(val);}} 
        />
      </Middle>
      <FootprintTable dateFootprints={dateFootprints} />
    </>
  );
};

export default Footprint;
