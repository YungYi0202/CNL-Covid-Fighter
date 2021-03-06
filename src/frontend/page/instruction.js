import React from "react";
import { Card, Menu, Button, Typography, Timeline, Table, Tag, Space } from "antd";

const { Title, Paragraph, Text, Link } = Typography;
const items = [
  {
    label: "PCR/快篩陽性",
    key: "confirmed"
  },
  {
    label: "入境者",
    key: "entrant"
  },
  {
    label: "確診者同住親友",
    key: "is_contacts"
  },
  {
    label: "確診者的密切接觸者的接觸者",
    key: "contact_of_contacts"
  }
];

const ConfirmedInstuct = () => {
  return (
    <Timeline style={{ paddingLeft: "20px" }}>
      <Timeline.Item>步驟一：透過遠距或視訊方式由醫師確認快篩結果。</Timeline.Item>
      <Timeline.Item>步驟二：至<Link href="https://www.cdc.gov.tw/Category/MPage/9wonLmQrvAdSAx55Ec7aWw">衛福部確診個案自主回報疫調系統</Link>回報。</Timeline.Item>
      <Timeline.Item>步驟三：至<Link href="https://my.ntu.edu.tw/ntuwdc/ConfirmedReport.aspx">臺大確診者通報系統</Link>通報。</Timeline.Item>
      <Timeline.Item>步驟四：居家照護七天。</Timeline.Item>
      <Timeline.Item>步驟五：無需採檢即可解除居家照護。</Timeline.Item>
      <Timeline.Item>步驟六：自主健康管理七天。</Timeline.Item>
    </Timeline>
  );
}

const EntrantInstuct = () => {
  return (
    <Timeline style={{ paddingLeft: "20px" }}>
      <Timeline.Item>步驟一：至<Link href="https://my.ntu.edu.tw/ntuwdc/reporting.aspx">臺大居家檢疫通報系統</Link>通報。</Timeline.Item>
      <Timeline.Item>步驟二：居家檢疫七天。</Timeline.Item>
      <Timeline.Item>步驟三：居家檢疫第七天或出現症狀時快篩。</Timeline.Item>
      <Timeline.Item>步驟四：自主健康管理七天。</Timeline.Item>
    </Timeline>
  );
}

const IsContactsInstuct = ({ mode }) => {
  return (
    <div>
      {
        mode === 4 || mode === 3 ?
          <>
            <Button style={{ marginLeft: "20px" }}> 打滿三劑者： </Button>
            <br />
            <br />
            <Timeline style={{ paddingLeft: "20px" }}>
              <Timeline.Item>步驟一：至<Link href="https://hackmd.io/https://my.ntu.edu.tw/ntuwdc/internalReport1.aspx">臺大密切接觸者通報</Link>通報。</Timeline.Item>
              <Timeline.Item>步驟二：居家隔離三天，並且在此期間進行一次快篩。</Timeline.Item>
              <Timeline.Item>步驟三：四天自主防疫。</Timeline.Item>
            </Timeline>
          </> : <></>
      }
      {
        mode === 4 || mode < 3 ?
          <>
            <Button style={{ marginLeft: "20px" }}> 未打滿三劑者： </Button>
            <br />
            <br />
            <Timeline style={{ paddingLeft: "20px" }}>
              <Timeline.Item>步驟一：至<Link href="https://hackmd.io/https://my.ntu.edu.tw/ntuwdc/internalReport1.aspx">臺大密切接觸者通報</Link>通報。</Timeline.Item>
              <Timeline.Item>步驟二：七天的自主防疫。</Timeline.Item>
            </Timeline>
          </> : <></>
      }
    </div>
  );
}

const ContactOfContactsInstuct = () => {
  return (
    <Timeline style={{ paddingLeft: "20px" }}>
      <Timeline.Item>步驟一：自我健康監測七天。</Timeline.Item>
    </Timeline>
  );
}

const columns = [
  {
    title: '狀態',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '定義',
    dataIndex: 'definition',
    key: 'definition',
  },
  {
    title: '快篩',
    dataIndex: 'antigen_test',
    key: 'antigen_test',
  },
  {
    title: '外出',
    dataIndex: 'outdoor',
    key: 'outdoor',
  },
];

const data = [
  {
    key: '1',
    status: '居家照護',
    definition: '一人一室，同為確診者可多人一室',
    antigen_test: '否',
    outdoor: '不可以'
  },
  {
    key: '2',
    status: '自主健康管理',
    definition: '避免出入無法保持社交距離之場合',
    antigen_test: '否',
    outdoor: '可以'
  },
  {
    key: '3',
    status: '居家檢疫',
    definition: '一人一戶',
    antigen_test: '第七日',
    outdoor: '需向衛生主管機關申請許可'
  },
  {
    key: '4',
    status: '居家隔離',
    definition: '一人一室',
    antigen_test: '三日內',
    outdoor: '需有兩日內快篩陰性證明'
  },
  {
    key: '5',
    status: '自主防疫',
    definition: '非必要不可外出',
    antigen_test: '否',
    outdoor: '需有兩日內快篩陰性證明'
  },
  {
    key: '6',
    status: '自我健康檢測',
    definition: '避免出入無法保持社交距離之場合',
    antigen_test: '否',
    outdoor: '可以'
  }
];

const Instruction = () => {
  const [information, setInformation] = React.useState("confirmed");
  return (
    <>
      <Card>
        <div style={{ display: "flex", height: "350px" }}>
          <Menu
            onClick={e => setInformation(e.key)}
            style={{ width: 256 }}
            defaultSelectedKeys={[information]}
            mode="inline"
            items={items}
          />
          {information === "confirmed" ? (
            <ConfirmedInstuct />
          ) : information === "entrant" ? (
            <EntrantInstuct />
          ) : information === "is_contacts" ? (
            <IsContactsInstuct mode={4} />
          ) : information === "contact_of_contacts" ? (
            <ContactOfContactsInstuct />
          ) : (
            <></>
          )}
        </div>
      </Card>
      <br />
      <br />
      <Card>
      <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
}

export {
  Instruction,
  ConfirmedInstuct,
  EntrantInstuct,
  IsContactsInstuct,
  ContactOfContactsInstuct
};
