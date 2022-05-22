import { getUsers } from "./data";

const checkUser = async (account, password) => {
  let users = await getUsers();
  let anyUser = users.filter(
    (user) => user.account === account && user.password === password
  );
  if (anyUser.length > 0)
    return {
      username: anyUser[0].username,
      text: anyUser[0].text,
      status: anyUser[0].status,
      key: anyUser[0].key
    };
  else return {};
};

export { checkUser };
