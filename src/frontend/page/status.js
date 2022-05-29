import React from "react";
import { Button } from "antd";
import Report from "../page/report";
import { updateUser } from "../../server/api";

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
  const [report, setReport] = React.useState(false);
  const [status, setStatus] = React.useState("健康");

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
      } else if (user.is_contact) {
        const contact_date = new Date(user.contact_date);
        const diffDays = Math.ceil((today - contact_date) / (1000 * 60 * 60 * 24));
        if (user.vaccine.num_doses < 3) {
          if (diffDays <= 3) {
            setStatus("居家隔離");
          } else if (diffDays <= 14) {
            setStatus("自主防疫");
          } else {
            const updatedUser = { ...user, is_contact: false, contact_date: "" };
            setUser(updatedUser);
            await updateUser(updatedUser);
            setStatus("健康");
          }
        } else {
          if (diffDays <= 7) {
            setStatus("自主防疫");
          } else {
            const updatedUser = { ...user, is_contact: false, contact_date: "" };
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

  const handleReportClick = () => {
    setReport(true);
  };

  const back = () => {
    setReport(false);
  };

  return (
    <>
      <h1> 歡迎，{user.username}！你當前的狀態為： {status} </h1>
      {report === true ? (
        <Report user={user} setUser={setUser} back={back} />
      ) : (
        <Button onClick={handleReportClick}> 我要通報確診 / 密切接觸者 </Button>
      )}
      <br />
      <br />
      <Button onClick={handleLogoutClick}> Logout </Button>
    </>
  );
};

export default Status;
