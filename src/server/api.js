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

const updateUser = async (user) => {
  const users = await getUsers();
  const index = users.findIndex((e) => e["account"] === user["account"])
  users[index] = user;
  const {
    data: { message }
  } = await instance.post('/updateUser', { users });
  return [message];
};

const addConfirmedRooms = async (addData) =>
  await addInElement("confirmedRooms.json", addData, "rooms");

const addFootprint = async (newFootprint) => {
  const footprint = await getFootprint();
  newFootprint["key"] = footprint.length;
  footprint.push(newFootprint)
  const {
    data: { message }
  } = await instance.post('/addFootprint', { footprint });
  return [message, newFootprint["key"]];
};

const getConfirmedUserKeys = async () => {
  let users = await getUsers();
  return users.filter(user => user.confirmed === true).map(user => user.key);
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
  addFootprint,
  getConfirmedUserKeys,
  getLocationOptions,
  checkUser,
  userExist,
  addUser
};
