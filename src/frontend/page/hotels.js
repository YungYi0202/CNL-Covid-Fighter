import { Button, message } from "antd";
import React from "react";
import { isValidHttpUrl } from "../utils/utils";
import { getHotels, getTelephones } from "../../server/api";
import styled from "styled-components";


const PageWindow = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  text-align: center;
  vertical-align: top;
`;


const Hotels = () => {
  const [hotels, setHotels] = React.useState([]);
  const [telephones, setTelephones] = React.useState([]);

  React.useEffect(() => {
    async function awaitHotels() {
      const tmp = await getHotels();
      setHotels(tmp);
    }
    awaitHotels();
  }, []);

  React.useEffect(() => {
    async function awaitTelephones() {
      const tmp = await getTelephones();
      setTelephones(tmp);
    }
    awaitTelephones();
  }, []);

  const handleStoreClick = (link) => {
    if (isValidHttpUrl(link)) window.open(link);
    else message.error("Not a valid link!");
  };


  const quarantineHotelLink = "https://www.findhotel.com.tw/taipei-hotel/?fbclid=IwAR2yVeGC0fAgsfXK6ocE2PWQJ5Hn__oPodws1WTBweR_ElszW0T_ZqWRoVU";
  return (
    <>
      <h1> 防疫旅館 </h1>
      
      <PageWindow dangerouslySetInnerHTML={{ __html: `"<iframe src='${quarantineHotelLink}' height='1000' width='1500' />"`}} />
      <h1> 防疫計程車電話 </h1>
      {telephones.map((telephone) => (
        <h2> {telephone} </h2>
      ))}
      <h1> TODO: map </h1>
    </>
  );
};

export default Hotels;
