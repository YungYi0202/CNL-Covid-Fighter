import React from "react";
import { InputNumber } from 'antd';
import { getFootprint, getConfirmedUserKeys } from "../../../server/api";
import FootprintTable from "./table";
import { getDateFootprint } from "../../utils/utils";
import styled from "styled-components";

const Middle = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 50px;
`;

const Footprint = () => {
  const [today, setToday] = React.useState(new Date());
  const [dayInterval, setDayInterval] = React.useState(7);
  const [rawData, setRawData] = React.useState([]);
  const [dateFootprints, setDateFootprints] = React.useState({});
  const [incubationPeriod, setIncubationPeriod] = React.useState(7);


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
      <FootprintTable dateFootprints={dateFootprints} />
    </>
  );
};

export default Footprint;
