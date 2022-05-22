import React from "react";
import { Button } from "antd";

const Info = () => {
  const link = "http://m.ntu.edu.tw/event/dnews/antiinfect.html";
  setTimeout(() => window.open(link), 5000);

  return (
    <>
      <h1> 五秒後會自動在新的分頁開啟臺大的疫情網頁 </h1>
      <h1> 如果連接失敗，可點下方的連結 </h1>
      <Button block type="link" onClick={() => window.open(link)}>
        點此開啟臺大的疫情網頁
      </Button>
    </>
  );
};

export default Info;
