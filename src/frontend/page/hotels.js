import { Button, message } from "antd";
import React from "react";
import { isValidHttpUrl } from "../utils/utils";
import { getHotels, getTelephones } from "../../backend/data";

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

  return (
    <>
      <h1> 防疫旅館 </h1>
      {hotels.map((hotel) => (
        <Button block type="link" onClick={() => handleStoreClick(hotel.link)}>
          {hotel.name}
        </Button>
      ))}
      <h1> 防疫計程車電話 </h1>
      {telephones.map((telephone) => (
        <h2> {telephone} </h2>
      ))}
      <h1> TODO: map </h1>
    </>
  );
};

export default Hotels;
