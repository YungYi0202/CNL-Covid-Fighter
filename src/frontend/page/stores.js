import { Button } from "antd";
import React from "react";
import styled from "styled-components";
// import { isValidHttpUrl } from "../utils/utils";
// import { getStores } from "../../backend/data";

const PageWindow = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  text-align: center;
  vertical-align: top;
`;

const Stores = () => {
  const link = "https://yasco.com.tw/tw/covid19sefttest.asp";
  // setTimeout(() => window.open(link), 5000);

  return (

    <>
      {/* <h1> 五秒後會自動在新的分頁開啟快篩地圖 </h1> */}
      <PageWindow dangerouslySetInnerHTML={{ __html: `"<iframe src='${link}' height='1000' width='1500' />"`}} />
      <Button block type="link" onClick={() => window.open(link)}>
        點此開啟快篩地圖
      </Button>
    </>
  );
};

export default Stores;
