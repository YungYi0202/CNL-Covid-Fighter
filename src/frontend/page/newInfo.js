import React from "react";
import styled from "styled-components";

import { Button } from "antd";

const PageWindow = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  text-align: center;
  vertical-align: top;
`;



const Info = () => {
  const link = "http://m.ntu.edu.tw/event/dnews/antiinfect.html";
  // setTimeout(() => window.open(link), 5000);

  return (
    <>
      <PageWindow dangerouslySetInnerHTML={{ __html: `"<iframe src='${link}' height='1000' width='1500' />"`}} />
      <Button block type="link" onClick={() => window.open(link)}>
        點此開啟臺大的疫情網頁
      </Button>
    </>
  );
};

export default Info;
