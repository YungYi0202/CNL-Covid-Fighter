import React from "react";
import { Menu } from "antd";
import { updateUser } from "../../server/api";

const items = [
  {
    label: "healthy",
    key: "healthy"
  },
  {
    label: "confirmed",
    key: "confirmed"
  },
  {
    label: "Stay-at-home order",
    key: "Stay-at-home order"
  },
  {
    label: "Self-quarantine",
    key: "Self-quarantine"
  },
  {
    label: "Self-health monitoring",
    key: "Self-health monitoring"
  },
  {
    label: "Rapid test negative ",
    key: "Rapid test negative"
  }
];

const Status = ({ user, setUser }) => {
  const [status, setStatus] = React.useState(user.status);

  React.useEffect(() => {
    async function awaitConfirmedRooms() {
      console.log({ ...user, status: status });
      await updateUser({ ...user, status: status });
    }
    awaitConfirmedRooms();
  });

  const onClick = (e) => {
    console.log("click ", e);
    setStatus(e.key);
    setUser((prevState) => ({ ...prevState, status: e.key }));
  };

  return (
    <>
      <h1> Current Status: {status} </h1>
      <Menu
        onClick={onClick}
        selectedKeys={[status]}
        mode="inline"
        items={items}
      />
      <h1>
        我的確診足跡： <br />
        需要列下來自己上傳過的足跡嗎？ （陳咏誼更：已做，當使用者設定自己的狀態為確診，就會自動將他的足跡列在台大確診足跡<br />
        發現打錯可以刪掉嗎？（感覺是比較次要的功能） <br />
      </h1>
    </>
  );
};

export default Status;
