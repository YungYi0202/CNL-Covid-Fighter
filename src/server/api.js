// import fs from "fs";
//import * as fs from 'fs'
// const fs = require('fs');
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

const readData = async (filename) => {
  let data = await require(__dirname + "/data/" + filename);
  return data;
};

// const appendData = async (filename, appendData) => {
//   if (!appendData || !Object.keys(appendData).length) return;
//   let data = await readData(filename);
//   let prev_data = await readData(filename);
//   await prev_data;
//   await data.push(appendData);
//   await data.sort((a, b) => b.key < a.key);
//   data = await JSON.stringify(data);
//   prev_data = await JSON.stringify(prev_data);
//   console.log("appendData (before): " + prev_data);
//   console.log("appendData (after): " + data);
//   // await fs.writeFileSync(__dirname + "/data/" + filename, data);
// };

const updateData = async (filename, updateData) => {
  if (!updateData || !Object.keys(updateData).length) return;
  let data = await readData(filename);
  let prev_data = await readData(filename);
  let index = await data.findIndex((item) => item.key === updateData.key);
  if (index === -1) {
    // await appendData(filename, updateData);
  } else {
    data[index] = Object.assign(data[index], updateData);
    data = JSON.stringify(data);
    prev_data = JSON.stringify(prev_data);
    console.log("the updateData");
    console.log(updateData);
    console.log("updateData (before): " + prev_data);
    console.log("updateData (after ): " + data);
    // await fs.writeFileSync(__dirname + "/data/" + filename, data);
  }
};

/*
const deleteData = async (filename, id) => {
  let data = readData(filename);
  let prev_data = readData(filename);
  data = data.filter(item => item.key !== updateData.key);
  console.log("deleteData (before): " + prev_data);
  console.log("deleteData (after): " + data);
  // await fs.writeFileSync(__dirname + "/data/" + filename, data);
};
*/

const addInElement = async (filename, addData, propName) => {
  console.log(addData);
  if (!addData || !Object.keys(addData).length) return;
  let data = await readData(filename);
  let prev_data = await readData(filename);
  let index = await data.findIndex((item) => item.key === addData.key);
  console.log(index);
  if (index === -1) {
    // appendData(filename, addData);
  } else {
    console.log(addData[propName]);
    data[index][propName] = data[index][propName].concat(addData[propName]);
    data = JSON.stringify(data);
    prev_data = JSON.stringify(prev_data);
    console.log("the addData");
    console.log(addData);
    console.log("addInElement (before): " + prev_data);
    console.log("addInElement (after ): " + data);
    // await fs.writeFileSync(__dirname + "/data/" + filename, data);
  }
};

const getUsers = async () => await readData("users.json");
const getStores = async () => await readData("stores.json");
const getPeople = async () => await readData("people.json");
const getConfirmedRooms = async () => await readData("confirmedRooms.json");
const getHotels = async () => await readData("hotels.json");
const getFootprint = async () => await readData("footprint.json");
const getTelephones = async () => await readData("telephones.json");
const getLocationOptions = async () => await readData("locationOptions.json");

const addUser = async (newUser) => {
  const users = await getUsers();
  newUser["key"] = users.length;
  users.push(newUser)
  const {
    data: { message }
  } = await instance.post('/addUser', { users });
  return [message];
};

const updateContactsAfterConfirmed = async (confirmedUser) => {
  const users = await getUsers();
  if(confirmedUser["dormitory"] !== "無") {
    for(let i = 0; i < users.length; i++) {
      if(users[i]["account"] !== confirmedUser["account"] && users[i]["dormitory"] === confirmedUser["dormitory"] &&
        users[i]["room"] === confirmedUser["room"]) {
        users[i] = {...users[i], is_contacts: true, contact_date: confirmedUser["confirmed_date"]};
      }
    }
  }
  const {
    data: { message }
  } = await instance.post('/updateUser', { users });
  return [message];
}

const updateUser = async (user) => {
  const users = await getUsers();
  const index = users.findIndex((e) => e["account"] === user["account"])
  users[index] = user;
  const {
    data: { message }
  } = await instance.post('/updateUser', { users });
  return [message];
};

const checkConfirmedRooms = async (dormitory, userKey, date) => {
  const confirmedRooms = await getConfirmedRooms();
  for (let i = 0; i < confirmedRooms[dormitory]; i++) {
    const roomData = confirmedRooms[dormitory][i];
    if (roomData.userKey === userKey && roomData.date === date) {
      return [confirmedRooms, i];
    }
  }
  return [confirmedRooms, -1];
}

/**
 * 
 * @param {Object} info {"dormitory": ..., "room": ..., "date": ..., "userKey": ... , "recoverNegative": ...} 
 */
const addConfirmedRooms = async (info) => {
  if (info.dormitory === "無") return "";
  const [confirmedRooms, found] = await checkConfirmedRooms(info.dormitory, info.userKey, info.date);
  if (found === -1) {
    const dorm = info.dormitory;
    delete info.dormitory
    confirmedRooms[dorm].push(info);
    const {
      data: { message }
    } = await instance.post('/updateConfirmedRooms', { confirmedRooms });
    return message;
  } else {
    return "此筆確診住宿資料已存在";
  }
}

/**
 * 
 * @param {Object} info {"dormitory": ..., "date": ..., "userKey"...} 
 */
const removeConfirmedRooms = async (info) => {
  if (info.dormitory === "無") return "";
  const [confirmedRooms, found] = await checkConfirmedRooms(info.dormitory, info.userKey, info.date);
  if (found === -1) {
    return "欲移除的該筆確診住宿資料不存在";
  } else {
    confirmedRooms[info.dormitory].splice(found, 1);
    const {
      data: { message }
    } = await instance.post('/updateConfirmedRooms', { confirmedRooms });
    return message;
  }
}

/**
 * 
 * @param {Object} info {"dormitory": ..., "date": ..., "userKey"...} 
 */
const recoverConfirmedRooms = async (info) => {
  if (info.dormitory === "無") return "";
  const [confirmedRooms, found] = await checkConfirmedRooms(info.dormitory, info.userKey, info.date);
  if (found === -1) {
    return "欲設定康復的該筆確診住宿資料不存在";
  } else {
    confirmedRooms[info.dormitory][found].recoverNegative = true;
    const {
      data: { message }
    } = await instance.post('/updateConfirmedRooms', { confirmedRooms });
    return message;
  }
}

const addFootprint = async (newFootprint) => {
  const footprint = await getFootprint();
  newFootprint["key"] = footprint.length;
  footprint.push(newFootprint)
  footprint.sort( function ( a, b ) { return new Date(b.date) - new Date(a.date); } );
  const {
    data: { message }
  } = await instance.post('/updateFootprint', { footprint });
  return [message, newFootprint["key"]];
};

const getEverConfirmedUsers = async () => {
  let users = await getUsers();
  return users.filter(user => user.confirmed_date !== "");
};

const checkUser = async (account, password) => {
  let users = await getUsers();
  let anyUser = users.filter(
    (user) => user.account === account && user.password === password
  );
  if (anyUser.length > 0)
    return anyUser[0];
  else return {};
};

const userExist = async (account) => {
  let users = await getUsers();
  let anyUser = users.filter(
    (user) => user.account === account
  );
  if (anyUser.length > 0) return true;
  else return false;
}

const sendEmailToContacts = async (confirmedUser) => {
  const users = await getUsers();
  const contactedUsers = users.filter(user => confirmedUser["account"] !== user["account"] && user["dormitory"] !== "無" && user["dormitory"] === confirmedUser["dormitory"] && user["room"] === confirmedUser["room"]);
  const {
    data: { message }
  } = await instance.post('/sendEmail', { contactedUsers });
  console.log("send email", message);
  return message;
}

export {
  getUsers,
  getStores,
  getPeople,
  getConfirmedRooms,
  getHotels,
  getFootprint,
  getTelephones,
  updateUser,
  addConfirmedRooms,
  removeConfirmedRooms,
  recoverConfirmedRooms,
  addFootprint,
  getEverConfirmedUsers,
  getLocationOptions,
  checkUser,
  userExist,
  addUser, 
  sendEmailToContacts, 
  updateContactsAfterConfirmed,
};
