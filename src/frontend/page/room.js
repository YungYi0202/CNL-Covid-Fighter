import React from "react";
import { getConfirmedRooms } from "../../server/api";
import { Select, InputNumber, Table, Card, Divider } from 'antd';
import styled from "styled-components";

const Option = {Select};
const Middle = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 20px;
`;

const dormsOptions =
  [
    "男一舍",
    "男二舍",
    "男三舍",
    "男四舍",
    "男五舍",
    "男六舍",
    "男七舍",
    "男八舍",
    "研一男舍",
    "研一女舍",
    "研三舍",
    "大一女舍",
    "女一舍",
    "女二舍",
    "女三舍",
    "女四舍",
    "女五舍",
    "女六舍",
    "女八舍",
    "女九舍"
  ];

/**
 * 
 * @param {confirmedRoomData} Object: key is dorm and,
 *  value is an object {'date': ..., 'room': , 'negative':..., 'key':...}
 */
const ConfirmedDormTable = ({ confirmedRoomData }) => {
  const tableColumns = [
    {
      title: '確診日期',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => b.date > a.date,
      sortDirections: ['descend'],
    },
    {
      title: '寢室',
      dataIndex: 'room',
    },
    {
      title: '是否康復為陰性',
      dataIndex: 'recoverNegative',
    }
  ];
  return (
    <>
      {Object.keys(confirmedRoomData).map((dorm, i) =>
        confirmedRoomData[dorm].length !== 0 ? (
          <>
            <h2> {dorm} </h2>
            <Table
              columns={tableColumns}
              dataSource={confirmedRoomData[dorm]}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 240 }}
            />
          </>
        ) : (
          <>
            <h2> {dorm} </h2>
            <p>目前無確診者居住</p>
          </>
        )
      )}
    </>
  );
};

const Room = () => {
  const [today, setToday] = React.useState(new Date());
  const [selectedDorms, setSelectedDorms] = React.useState(dormsOptions);
  const [rawData, setRawData] = React.useState({});
  const [dayInterval, setDayInterval] = React.useState(7);
  const [shownData, setShownData] = React.useState({});

  React.useEffect(() => {
    async function awaitConfirmedRooms() {
      let response = await getConfirmedRooms();
      setRawData(response);
    }
    awaitConfirmedRooms();
  }, []);

  React.useEffect(()=> {
    let tmp = {};
    for (const [dorm, list] of Object.entries(rawData)) {
      if (selectedDorms.includes(dorm)) {
        tmp[dorm] = list.filter(data => isWithinInterval(data)).map(
          (data) => {
            return {
              ...data,
              "recoverNegative": data.recoverNegative? "是":"否"
            }; 
          }
        );
      
      }
    }
    setShownData(tmp);
  }, [dayInterval, rawData, selectedDorms]);

  function isWithinInterval(data) {
    let date = new Date(data.date);  
    return date > (today - dayInterval * 86400000);
  }

  return (
    <>
    <Card  style={{
      marginTop: "20px",
      background: "#f0f0f0",
      borderColor: "#bebebe"
    }}>
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
        <Select
          size="large"
          mode="multiple"
          style={{
            width: '100%',
          }}
          showSearch
          placeholder="篩選宿舍"
          optionFilterProp="children"
          onChange={(value) => {
            if (value.length === 0) {
              setSelectedDorms(dormsOptions);
            } else {
              setSelectedDorms(value);
            }
          }}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
          {dormsOptions.map(option => 
            <Option value={option}>{option}</Option>
          )}
        </Select>
      </Middle>
    </Card>
    <Divider />
    <Card>
      <ConfirmedDormTable confirmedRoomData={shownData}></ConfirmedDormTable>
    </Card>
    </>
  );
};
export default Room;
