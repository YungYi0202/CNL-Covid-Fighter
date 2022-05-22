import { Button } from "antd";
import React from "react";
// import { isValidHttpUrl } from "../utils/utils";
// import { getStores } from "../../backend/data";

const Stores = () => {
  const link = "https://yasco.com.tw/tw/covid19sefttest.asp";
  setTimeout(() => window.open(link), 5000);

  return (
    <>
      <h1> 五秒後會自動在新的分頁開啟快篩地圖 </h1>
      <h1> 如果連接失敗，可點下方的連結 </h1>
      <Button block type="link" onClick={() => window.open(link)}>
        點此開啟快篩地圖
      </Button>
    </>
  );
};

export default Stores;
