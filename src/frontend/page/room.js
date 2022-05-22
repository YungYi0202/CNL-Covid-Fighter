import React from "react";
import { getConfirmedRooms } from "../../server/api";

const Room = () => {
  const [dormitories, setDormitories] = React.useState([]);

  React.useEffect(() => {
    async function awaitConfirmedRooms() {
      const tmp = await getConfirmedRooms();
      setDormitories(tmp);
    }
    awaitConfirmedRooms();
  }, []);

  return (
    <>
      {dormitories.map((dormitory) =>
        dormitory.rooms.length !== 0 ? (
          <>
            <h1> {dormitory.label} </h1>
            {dormitory.rooms.map((room) => (
              <h2> {room} </h2>
            ))}{" "}
          </>
        ) : (
          <></>
        )
      )}
    </>
  );
};
export default Room;
