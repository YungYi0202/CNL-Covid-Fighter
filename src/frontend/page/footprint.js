import React from "react";
import { getFootprint } from "../../backend/data";

const Footprint = () => {
  const [footprints, setFootprints] = React.useState([]);

  React.useEffect(() => {
    async function awaitFootprint() {
      const tmp = await getFootprint();
      console.log(tmp);
      setFootprints(tmp);
    }
    awaitFootprint();
  }, []);

  return (
    <>
      {footprints.map((date, i) =>
        date.places.length !== 0 ? (
          <>
            <h1> {date.key} </h1>
            {date.places.map((room) => (
              <h2> {room} </h2>
            ))}{" "}
          </>
        ) : (
          <></>
        )
      )}
      <h1> TODO: map </h1>
    </>
  );
};

export default Footprint;
