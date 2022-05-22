import React from "react";
import { InputNumber, Table } from 'antd';
import { getFootprint } from "../../backend/data";

const Footprint = () => {
  const [today, setToday] = React.useState(new Date());
  const [dayInterval, setDayInterval] = React.useState(7);
  const [allFootprints, setAllFootprints] = React.useState([]);
  const [footprints, setFootprints] = React.useState([]);

  React.useEffect(() => {
    async function awaitFootprint() {
      const response = await getFootprint();
      setAllFootprints(response);
    }
    awaitFootprint();
  }, []);

  React.useEffect(() => {
    setFootprints(allFootprints.filter(fp => showFootPrint(fp)));
  }, [allFootprints, dayInterval]);

  function showFootPrint(fp) {
    let date = new Date(fp.date);
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

  function mapFootprintsTableData(fp, index) {
    fp["key"] = index + 1;
    return fp;
  }

  return (
    <>
      <InputNumber 
      min={1} max={31} 
      addonBefore={"顯示"}
      addonAfter={"天內資料"}
      defaultValue={dayInterval} 
      onChange={(val) => {setDayInterval(val);}} />
      
      {footprints.map((fp, i) =>
        fp.footprints.length !== 0 ? (
          <>
            <h1> {fp.date} </h1>
            <Table 
            columns={tableColumns} 
            dataSource={fp.footprints.map((data, i) => {
              data["key"] = i + 1;
              return data;
            })}
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
