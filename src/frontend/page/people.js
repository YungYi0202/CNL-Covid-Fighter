import React from "react";
import { getPeople } from "../../server/api";

const People = () => {
  const [people, setPeople] = React.useState({ today: 0, accumulative: 0 });

  React.useEffect(() => {
    async function awaitPeople() {
      const tmp = await getPeople();
      setPeople(tmp);
    }
    awaitPeople();
  }, []);

  return (
    <>
      <h1> 今日確診： </h1>
      <h1> {people.today} </h1>
      <h1> 累積確診： </h1>
      <h1> {people.accumulative} </h1>
    </>
  );
};

export default People;
