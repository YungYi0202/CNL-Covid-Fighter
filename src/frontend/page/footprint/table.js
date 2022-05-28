import React from "react";
import { Table } from 'antd';

/**
 * 
 * @param {dateFootprints} Object: key is date and,
 *  value is an object {'time': ..., 'location': , 'note': ..., 'key':...}
 */
const FootprintTable = ({ dateFootprints }) => {
  const tableColumns = [
    {
      title: '時間',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => b.time > a.time,
      sortDirections: ['descend'],
    },
    {
      title: '地點',
      dataIndex: 'location',
    },
    {
      title: '備註',
      dataIndex: 'note',
    }
  ];
  return (
    <>
      {
        
        Object.keys(dateFootprints).length === 0?
        <>
          <h2>目前無確診足跡</h2>
        </>
        :
        Object.keys(dateFootprints).map((date, i) =>
          dateFootprints[date].length !== 0 ? (
            <>
              <h2> {date} </h2>
              <Table
                columns={tableColumns}
                dataSource={dateFootprints[date]}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
              />
            </>
          ) : (
            <></>
          )
        )
      }
    </>
  );
};

export default FootprintTable;