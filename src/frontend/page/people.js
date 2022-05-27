import React from "react";
import { getPeople } from "../../server/api";
import styled from "styled-components";


const PageWindow = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 0px 0px 0px;
  text-align: center;
  vertical-align: top;
`;

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
    <PageWindow>
      <img src="https://my.ntu.edu.tw/ntuwdc/nasattach/main.jpg" ></img>
    </PageWindow>
    </>
  );
};

export default People;
