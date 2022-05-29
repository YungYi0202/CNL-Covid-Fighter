import React from "react";
import { Menu, Button, Typography, Timeline } from "antd";
import Report from "../page/report";
import { updateUser } from "../../server/api";

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
  const [report, setReport] = React.useState(false);
  const [status, setStatus] = React.useState("健康");
  const [information, setInformation] = React.useState(defaultInformation);
  const [threeDoses, setThreeDoses] = React.useState(false);
  const [lessThanThreeDoses, setLessThanThreeDoses] = React.useState(false);

  React.useEffect(() => {
    async function renderStatus() {
      const today = new Date();
      if (user.confirmed) {
        const confirmed_date = new Date(user.confirmed_date);
        const diffDays = Math.ceil((today - confirmed_date) / (1000 * 60 * 60 * 24));
        console.log(diffDays);
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

  React.useEffect(() => {
    setInformation(
      user.confirmed ? "confirmed" : (
        user.entrant ? "entrant" : (
          user.is_contacts ? "is_contacts" : (
            user.contact_of_contacts ? "contact_of_contacts" : "confirmed"
          )
        )
      )
    );
  }, [user]);

  const handleReportClick = () => {
    setReport(true);
  };

  const back = () => {
    setReport(false);
  };

  const onClick = e => {
    setInformation(e.key);
  };

  const handleThreeDoses = () => {
    setThreeDoses(!threeDoses);
  };

  const handleLessThanThreeDoses = () => {
    setLessThanThreeDoses(!lessThanThreeDoses);
  };

  return (
    <>
      <h1> 歡迎，{user.username}！你當前的狀態為： {status} </h1>
      {report === true ? (
        <Report user={user} setUser={setUser} back={back} />
      ) : (
        <>
          <Button onClick={handleReportClick}> 我要通報確診 / 密切接觸者 </Button>
          <br />
          <br />
          <div style={{ display: "flex", height: "350px" }}>
            <Menu
              onClick={onClick}
              style={{ width: 256 }}
              defaultSelectedKeys={[information]}
              mode="inline"
              items={items}
            />
            {information === "confirmed" ? (
              <Timeline style={{ paddingLeft: "20px" }}>
                <Timeline.Item>步驟一：透過遠距或視訊方式由醫師確認快篩結果。</Timeline.Item>
                <Timeline.Item>步驟二：至<Link href="https://www.cdc.gov.tw/Category/MPage/9wonLmQrvAdSAx55Ec7aWw">衛福部確診個案自主回報疫調系統</Link>回報。</Timeline.Item>
                <Timeline.Item>步驟三：至<Link href="https://my.ntu.edu.tw/ntuwdc/ConfirmedReport.aspx">臺大確診者通報系統</Link>通報。</Timeline.Item>
                <Timeline.Item>步驟四：居家照護七天。</Timeline.Item>
                <Timeline.Item>步驟五：無需採檢即可解除居家照護。</Timeline.Item>
                <Timeline.Item>步驟六：自主健康管理七天。</Timeline.Item>
              </Timeline>
            ) : information === "entrant" ? (
              <Timeline style={{ paddingLeft: "20px" }}>
                <Timeline.Item>步驟一：至<Link href="https://my.ntu.edu.tw/ntuwdc/reporting.aspx">臺大居家檢疫通報系統</Link>通報。</Timeline.Item>
                <Timeline.Item>步驟二：居家檢疫七天。</Timeline.Item>
                <Timeline.Item>步驟三：居家檢疫第七天或出現症狀時快篩。</Timeline.Item>
                <Timeline.Item>步驟四：自主健康管理七天。</Timeline.Item>
              </Timeline>
            ) : information === "is_contacts" ? (
              <div>
                <Button onClick={handleThreeDoses} style={{ marginLeft: "20px" }}> 如果打滿三劑： </Button>
                <br />
                <br />
                {
                  threeDoses ? (
                    <Timeline style={{ paddingLeft: "20px" }}>
                      <Timeline.Item>步驟一：至<Link href="https://hackmd.io/https://my.ntu.edu.tw/ntuwdc/internalReport1.aspx">臺大密切接觸者通報</Link>通報。</Timeline.Item>
                      <Timeline.Item>步驟二：居家隔離三天，並且在此期間進行一次快篩。</Timeline.Item>
                      <Timeline.Item>步驟三：四天自主防疫。</Timeline.Item>
                    </Timeline>
                  ) : (
                    <></>
                  )
                }
                <Button onClick={handleLessThanThreeDoses} style={{ marginLeft: "20px" }}> 如果未打滿三劑： </Button>
                <br />
                <br />
                {
                  lessThanThreeDoses ? (
                    <Timeline style={{ paddingLeft: "20px" }}>
                      <Timeline.Item>步驟一：至<Link href="https://hackmd.io/https://my.ntu.edu.tw/ntuwdc/internalReport1.aspx">臺大密切接觸者通報</Link>通報。</Timeline.Item>
                      <Timeline.Item>步驟二：七天的自主防疫。</Timeline.Item>
                    </Timeline>
                  ) : (
                    <></>
                  )
                }
              </div>
            ) : information === "contact_of_contacts" ? (
              <Timeline style={{ paddingLeft: "20px" }}>
                <Timeline.Item>步驟一：自我健康監測七天。</Timeline.Item>
              </Timeline>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <br />
      <br />
      <Button onClick={handleLogoutClick}> Logout </Button>
    </>
  );
};

export default Status;
