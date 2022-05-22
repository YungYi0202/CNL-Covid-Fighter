import React from "react";
import { InputNumber, Table } from 'antd';
import { getFootprint, getConfirmedUserKeys } from "../../backend/data";

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
      if (dict[data.date] == undefined) {
        dict[data.date] = [];
      }
      dict[data.date].push({
        "time": data.time,
        "location": data.location,
        "note": data.note
      });
    }
    setDateFootprints(dict);
  }, [rawData, dayInterval]);

  function isWithinInterval(fp) {
    let date = new Date(fp.date);
    let userKey = fp.userKey;
    
    return date > (today - dayInterval * 86400000);
  }

  const tableColumns = [
    {
      title: 'Time',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => b.time > a.time,
      sortDirections: ['descend'],
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Note',
      dataIndex: 'note',
    }
  ];

  return (
    <>
      <InputNumber 
      min={1} max={31} 
      addonBefore={"顯示"}
      addonAfter={"天內資料"}
      defaultValue={dayInterval} 
      onChange={(val) => {setDayInterval(val);}} />
      
      {Object.keys(dateFootprints).map((date, i) =>
        dateFootprints[date].length !== 0 ? (
          <>
            <h1> {date} </h1>
            <Table 
            columns={tableColumns} 
            dataSource={dateFootprints[date]}
            pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
            />
          </>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default Footprint;
