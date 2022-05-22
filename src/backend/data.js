// import fs from "fs";
//import * as fs from 'fs'
// const fs = require('fs');

const readData = async (filename) => {
  // let data = await fs.readFileSync(__dirname + "/data/" + filename, "utf-8");
  // data = JSON.parse(data.toString());
  // return data;
  let data = await require(__dirname + "/data/" + filename);
  // console.log(data);
  return data;
};

const appendData = async (filename, appendData) => {
  if (!appendData || !Object.keys(appendData).length) return;
  let data = await readData(filename);
  let prev_data = await readData(filename);
  await prev_data;
  await data.push(appendData);
  await data.sort((a, b) => b.key < a.key);
  data = await JSON.stringify(data);
  prev_data = await JSON.stringify(prev_data);
  console.log("appendData (before): " + prev_data);
  console.log("appendData (after): " + data);
  // await fs.writeFileSync(__dirname + "/data/" + filename, data);
};

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
    appendData(filename, addData);
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
const getCSIEFootprint = async () => await readData("csiefootprint.json");
const getTelephones = async () => await readData("telephones.json");
const getLocationOptions = async () => await readData("locationOptions.json");

const updateUser = async (data) => await updateData("users.json", data);

const addConfirmedRooms = async (addData) =>
  await addInElement("confirmedRooms.json", addData, "rooms");
const addFootprint = async (addData) => {
  console.log(addData);
  const data = await getFootprint();
  data.push(addData);
  try {
    // await fs.writeFileSync(__dirname + "/data/footprint.json" , data);
    await fs.writeFile(__dirname + "/data/footprint.json" , data);
  } catch (err) {
    throw err;
  }
  
};
const addCSIEFootprint = async (addData) =>
  await addInElement("csiefootprint.json", addData, "places");

const getConfirmedUserKeys = async () => {
  let users = await getUsers();
  return users.filter(user => user.status === "confirmed").map(user => user.key);
};

export {
  getUsers,
  getStores,
  getPeople,
  getConfirmedRooms,
  getHotels,
  getFootprint,
  getTelephones,
  getCSIEFootprint,
  updateUser,
  addConfirmedRooms,
  addFootprint,
  addCSIEFootprint,
  getConfirmedUserKeys,
  getLocationOptions
};
