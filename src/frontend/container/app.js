import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import Signin from "../page/signin";
import Info from "../page/info";
import Calendar from "../page/calendar";
import RoomInform from "../page/roomInform";
import FootprintInform from "../page/footprint/footprintInform";
import People from "../page/people";
import Room from "../page/room";
import Footprint from "../page/footprint/footprint";
import Stores from "../page/stores";
import NewInfo from "../page/newInfo";
import Hotels from "../page/hotels";
import { isEmpty } from "../utils/utils";

const items = [
  {
    label: "我的狀態",
    key: "signin"
  },
  {
    label: "臺大疫情資訊",
    key: "info"
  },
  {
    label: "我的防疫日曆",
    key: "calendar",
    disabled: true
  },
  {
    label: "確診寢室通報",
    key: "roomInform",
    disabled: true
  },
  {
    label: "我的足跡通報",
    key: "footprintInform",
    disabled: true
  },
  {
    label: "臺大確診人數",
    key: "people"
  },
  {
    label: "臺大確診寢室",
    key: "room"
  },
  {
    label: "臺大確診足跡",
    key: "footprint"
  },
  {
    label: "快篩購買資訊",
    key: "stores"
  },
  {
    label: "臺大最新資訊",
    key: "newInfo"
  },
  {
    label: "防疫交通住宿",
    key: "traffic"
  }
];

const App = () => {
  const [current, setCurrent] = React.useState("signin");
  const [user, setUser] = React.useState({});
  const [menu, setMenu] = React.useState(items);

  React.useEffect(() => {
    if (!isEmpty(user)) {
      console.log("notempty");
      setMenu(() => items.map((item) => ({ ...item, disabled: false })));
    } else {
      console.log("empty");
      setMenu(items);
    }
  }, [user]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menu}
      />
      {current === "signin" ? (
        <Signin user={user} setUser={setUser} />
      ) : current === "info" ? (
        <Info />
      ) : current === "calendar" ? (
        <Calendar />
      ) : current === "roomInform" ? (
        <RoomInform />
      ) : current === "footprintInform" ? (
        <FootprintInform user={user}/>
      ) : current === "people" ? (
        <People />
      ) : current === "room" ? (
        <Room />
      ) : current === "footprint" ? (
        <Footprint />
      ) : current === "stores" ? (
        <Stores />
      ) : current === "newInfo" ? (
        <NewInfo />
      ) : current === "traffic" ? (
        <Hotels />
      ) : (
        <h1> Why???? </h1>
      )}
    </>
  );
};

export default App;
