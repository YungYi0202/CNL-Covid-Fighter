import React from "react";
import { Button, Typography, PageHeader, Divider, Steps, Popover } from "antd";
import Report from "../page/report";
import AntigenTest from "../page/antigenTest";
import {ConfirmedInstuct, EntrantInstuct, IsContactsInstuct ,ContactOfContactsInstuct} from "./instruction"
import { DeleteOutlined } from '@ant-design/icons';
import { updateUser, addConfirmedRooms, removeConfirmedRooms, recoverConfirmedRooms, updateContactsAfterConfirmed, sendEmailToContacts } from "../../server/api";

const { Step } = Steps;
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

const customDot = (dot, { status, index }) => (
  <Popover>
    {dot}
  </Popover>
);

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('/');
}

const Status = ({ user, setUser, handleLogoutClick }) => {
  const defaultInformation = user.confirmed ? "confirmed" : (
    user.entrant ? "entrant" : (
      user.is_contacts ? "is_contacts" : (
        user.contact_of_contacts ? "contact_of_contacts" : "confirmed"
      )
    )
  );
  const [report, setReport] = React.useState("default");
  const [status, setStatus] = React.useState("健康");

  const [stepsNode, setStepsNode] = React.useState([]);
  const updateUserStatus = async (updatedUser) => {
    const orderedDate = Object.keys(updatedUser.antigen_test).sort(function (a, b) {
      a = a.split('/').join('');
      b = b.split('/').join('');
      return a > b ? -1 : a < b ? 1 : 0;
    });
    let latest = orderedDate.findIndex((e) => updatedUser.antigen_test[e] === "positive");
    const today = new Date();
    if (user.confirmed) {
      if (latest === -1) {
        /* It means that the confirmed news is wrong.*/
        const msg = await removeConfirmedRooms({"dormitory": user.dormitory , "date": user.confirmed_date, "userKey": user.key});
        updatedUser = {
          ...user,
          confirmed: false,
          confirmed_date: "",
          recover_date: ""
        };
      } else {
        latest = new Date(orderedDate[latest]);
        const diffDays = Math.ceil((today - latest) / (1000 * 60 * 60 * 24)) > 14;
        if (diffDays > 14) {
          const msg = await recoverConfirmedRooms({"dormitory": user.dormitory , "date": user.confirmed_date, "userKey": user.key});
          const recover_date = new Date();
          recover_date.setDate(latest.getDate() + 14);
          updatedUser = {
            ...user,
            confirmed: false,
            confirmed_date: "",
            recover_date: formatDate(recover_date)
          };
        }
      }
    } else {
      latest = new Date(orderedDate[latest]);
      if (Math.ceil((today - latest) / (1000 * 60 * 60 * 24)) <= 14) {
        updatedUser = {
          ...user,
          confirmed: true,
          confirmed_date: formatDate(latest),
          recover_date: ""
        };
        await sendEmailToContacts(updatedUser);
        await updateContactsAfterConfirmed(updatedUser);
        const msg = await addConfirmedRooms({"dormitory": user.dormitory, "room": user.room, "date": formatDate(latest), "userKey": user.key, "recoverNegative": false});
      }
    }
    setUser(updatedUser);
    await updateUser(updatedUser);
  }

  const onDeleteClick = async (e) => {
    const updatedUser = { ...user };
    delete updatedUser.antigen_test[e];
    await updateUserStatus(updatedUser);
  };

  React.useEffect(() => {
    const orderedDate = Object.keys(user.antigen_test).sort(function (a, b) {
      a = a.split('/').join('');
      b = b.split('/').join('');
      return a > b ? 1 : a < b ? -1 : 0;
    });
    const tmp = [];
    const today = new Date();
    orderedDate.forEach((e) => {
      const diffDays = Math.ceil((today - new Date(e)) / (1000 * 60 * 60 * 24));
      if (diffDays <= 31) {
        tmp.push(<Step
          title={user.antigen_test[e]}
          description={(
            <>
              <label>{e}</label>
              <br />
              <Button shape="circle" icon={<DeleteOutlined />} onClick={() => onDeleteClick(e)} />
            </>
          )}
        />);
      }
    });
    setStepsNode(tmp);
  }, [user]);

  React.useEffect(() => {
    async function renderStatus() {
      const today = new Date();
      if (user.confirmed) {
        const confirmed_date = new Date(user.confirmed_date);
        const diffDays = Math.ceil((today - confirmed_date) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          setStatus("居家照護");
        } else if (diffDays <= 14) {
          setStatus("自主健康管理");
        } else {
          const recover_date = new Date();
          recover_date.setDate(confirmed_date.getDate() + 14);
          const updatedUser = {
            ...user,
            confirmed: false,
            confirmed_date: "",
            recover_date: formatDate(recover_date)
          };
          setUser(updatedUser);
          await updateUser(updatedUser);
          setStatus("健康");
        }
      } else if (user.entrant) {
        const entry_date = new Date(user.entry_date);
        const diffDays = Math.ceil((today - entry_date) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          setStatus("居家檢疫");
        } else if (diffDays <= 14) {
          setStatus("自主健康管理");
        } else {
          const updatedUser = { ...user, entrant: false, entry_date: "" };
          setUser(updatedUser);
          await updateUser(updatedUser);
          setStatus("健康");
        }
      } else if (user.is_contacts) {
        const contact_date = new Date(user.contact_date);
        const diffDays = Math.ceil((today - contact_date) / (1000 * 60 * 60 * 24));
        if (user.vaccine.num_doses < 3) {
          if (diffDays <= 3) {
            setStatus("居家隔離");
          } else if (diffDays <= 14) {
            setStatus("自主防疫");
          } else {
            const updatedUser = { ...user, is_contacts: false, contact_date: "" };
            setUser(updatedUser);
            await updateUser(updatedUser);
            setStatus("健康");
          }
        } else {
          if (diffDays <= 7) {
            setStatus("自主防疫");
          } else {
            const updatedUser = { ...user, is_contacts: false, contact_date: "" };
            setUser(updatedUser);
            await updateUser(updatedUser);
            setStatus("健康");
          }
        }
      } else if (user.contact_of_contacts) {
        const contact_date = new Date(user.contact_contacts_date);
        const diffDays = Math.ceil((today - contact_date) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          setStatus("自我健康監測");
        } else {
          const updatedUser = { ...user, contact_of_contacts: false, contact_contacts_date: "" };
          setUser(updatedUser);
          await updateUser(updatedUser);
          setStatus("健康");
        }
      } else {
        setStatus("健康");
      }
    }
    renderStatus();
  }, [user]);

  const back = () => {
    setReport("default");
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        ghost={true}
        // title={<h4>歡迎，{user.username}！</h4>}
        title={`歡迎，${user.username}！`}
        backIcon={false}
        extra={[
          <Button onClick={() => setReport("report_identity")}> 我是確診 / 密切接觸者 </Button>,
          <Button onClick={() => setReport("antigen_test")}> 我要紀錄快篩 </Button>,
          <Button onClick={handleLogoutClick} type="primary">登出</Button>
        ]}
      >
        <div style={{ display: "flex"}}>
          <Title level={4}>
          {
            status === "健康"?
            "您今日的狀態為健康"
            :
              `您是 ${
              defaultInformation === "confirmed"? "確診者"
              : defaultInformation === "entrant"? "入境者"
              : defaultInformation === "is_contacts"? "確診者的同住親友"
              : "確診者的密切接觸者的接觸者"
              } ，今天是 ${status} 的日子`
          }
          </Title>
        </div>
      </PageHeader>
      <Divider/>
      <Title level={4} style={{padding: "20px"}}>快篩紀錄</Title>
      <Steps current={40} progressDot={customDot}>
        {stepsNode}
      </Steps>
      <Divider/>
      { status === "健康"?
        <></>:
        <>
        <Title level={4} style={{padding: "20px"}}>相關指示</Title>
        {
          defaultInformation === "confirmed"?  <ConfirmedInstuct />
          : defaultInformation === "entrant"? <EntrantInstuct />
          : defaultInformation === "is_contacts"? <IsContactsInstuct mode={user.vaccine.num_doses}/>
          : <ContactOfContactsInstuct />
        } 
        </>
      }

      <br></br>
      <br></br>   
      {report === "report_identity" ? (
        <Report user={user} setUser={setUser} back={back} />
      ) : report === "antigen_test" ? (
        <AntigenTest user={user} setUser={setUser} back={back} updateUserStatus={updateUserStatus}/>
      ) : 
        <></>
      }    
    </>
  );
};

export default Status;
