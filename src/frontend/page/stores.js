import { Button, message } from "antd";
import React from "react";
import { isValidHttpUrl } from "../utils/utils";
import { getStores } from "../../backend/data";

function Stores() {
  const [roads, setRoads] = React.useState([]);

  React.useEffect(() => {
    async function awaitRoads() {
      const tmp = await getStores();
      setRoads(tmp);
    }
    awaitRoads();
  }, []);

  const handleStoreClick = (link) => {
    if (isValidHttpUrl(link)) window.open(link);
    else message.error("Not a valid link!");
  };

  return (
    <>
      {roads.map((road) =>
        road.stores.length !== 0 ? (
          <>
            <h1> {road.road} </h1>
            {road.stores.map((store) => (
              <Button
                block
                type="link"
                onClick={() => handleStoreClick(store.link)}
              >
                {store.name}
              </Button>
            ))}
          </>
        ) : (
          <></>
        )
      )}
      <h1> TODO: map </h1>
    </>
  );
}

export default Stores;
