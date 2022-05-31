import React from "react";
import { Calendar, Badge } from "antd";

var moment = require("moment");

const myCalendar = ({ user }) => {
  let statuses = user.statuses;
  let tests = user.antigen_test;
  let num_doses = user.vaccine.doses.indexOf("尚未接種") + 1;

  let testKeys = Object.keys(tests).sort();
  testKeys = testKeys.map((x) => {
    let tmp = moment(new Date(x));
    tmp["_d"] = tmp._i;
    return tmp;
  });
  let startTestDay = testKeys[0];
  let endTestDay = testKeys[testKeys.length - 1];

  let statusKeys = Object.keys(statuses).sort();
  statusKeys = statusKeys.map((x) => {
    let tmp = moment(new Date(x));
    tmp["_d"] = tmp._i;
    return tmp;
  });
  let startStatusDay = statusKeys[0];
  let endStatusDay = statusKeys[statusKeys.length - 1];

  let startDay = startStatusDay.isAfter(startTestDay, "day")
    ? startTestDay
    : startStatusDay;
  let endDay = endStatusDay.isAfter(endTestDay, "day")
    ? endStatusDay
    : endTestDay;

  let behavior = new Array(endDay.diff(startDay, "d") + 14 + 1);

  testKeys.forEach((date, _) => {
    let index = date.diff(startDay, "d");
    if (tests[date.format("YYYY/MM/DD")] === "positive") {
      if (behavior[index] === "居家照護" || behavior[index] === "自主健康管理")
        return;

      let flag = true;
      for (let i = 1; i <= 7 && flag; ++i) {
        let tmpDay = moment(startDay.valueOf());
        tmpDay.add(index + i, "d");

        if (statuses[tmpDay.format("YYYY/MM/DD")] === "健康") {
          flag = false;
          break;
        }
        behavior[index + i] = "居家照護";
      }
      if (flag === false) return;
      for (let i = 8; i <= 14; ++i) {
        let tmpDay = moment(startDay.valueOf());
        tmpDay.add(index + i, "d");

        if (statuses[tmpDay.format("YYYY/MM/DD")] === "健康") break;
        behavior[index + i] = "自主健康管理";
      }
    }
  });

  statusKeys.forEach((date, _) => {
    let index = date.diff(startDay, "d");
    if (statuses[date.format("YYYY/MM/DD")] === "入境者") {
      for (let i = 1; i <= 6; ++i) {
        if (!behavior.hasOwnProperty(index + i))
          behavior[index + i] = "居家檢疫";
      }
      for (let i = 7; i <= 7; ++i) {
        if (!behavior.hasOwnProperty(index + i))
          behavior[index + i] = "*居家檢疫*請於今日快篩";
      }
      for (let i = 8; i <= 14; ++i) {
        if (!behavior.hasOwnProperty(index + i))
          behavior[index + i] = "自主健康管理";
      }
    }
  });

  statusKeys.forEach((date, _) => {
    let index = date.diff(startDay, "d");
    if (statuses[date.format("YYYY/MM/DD")] === "確診者同住親友、同寢室") {
      console.log(num_doses);
      if (num_doses !== 3) {
        for (let i = 1; i <= 1; ++i) {
          if (!behavior.hasOwnProperty(index + i))
            behavior[index + i] = "*居家隔離*請於三日內快篩";
        }
        for (let i = 2; i <= 3; ++i) {
          if (!behavior.hasOwnProperty(index + i))
            behavior[index + i] = "居家隔離";
        }
        for (let i = 4; i <= 7; ++i) {
          if (!behavior.hasOwnProperty(index + i))
            behavior[index + i] = "自主防疫";
        }
      } else {
        for (let i = 1; i <= 7; ++i) {
          if (!behavior.hasOwnProperty(index + i))
            behavior[index + i] = "自主防疫";
        }
      }
    }
  });

  statusKeys.forEach((date, _) => {
    let index = date.diff(startDay, "d");
    if (statuses[date.format("YYYY/MM/DD")] === "確診者的密切接觸者的接觸者") {
      for (let i = 1; i <= 7; ++i) {
        if (!behavior.hasOwnProperty(index + i))
          behavior[index + i] = "自主防疫";
      }
    }
  });

  // console.log(behavior);

  let behavior2color = {
    "居家檢疫": "pink",
    "自主健康管理": "cyan",
    "居家隔離": "geekblue",
    "居家照護": "orange"
  }

  function getDateData(value) {
    let listData = [];
    let date = value.format("YYYY/MM/DD");
    if (statuses.hasOwnProperty(date)) {
      switch (statuses[date]) {
        case "健康":
          listData.push({ color: "green", content: "健康" });
          break;
        case "快篩陽性":
          listData.push({ color: "red", content: "快篩陽性" });
          break;
        case "入境者":
          listData.push({ color: "blue", content: "入境" });
          break;
        case "確診者同住親友、同寢室":
          listData.push({ color: "gray", content: "同住人確診" });
          break;
        case "確診者的密切接觸者的接觸者":
          listData.push({ color: "purple", content: "他人確診" });
          break;
        default:
          break;
      }
    }

    let index = value.diff(startDay, "d");
    if (index >= 0 && index < behavior.length) {
      if (behavior.hasOwnProperty(index)) {
        if (behavior[index][0] === "*") {
          let messages = behavior[index].split("*");
          listData.unshift({ color: "yellow", content: messages[2] });
          listData.push({ color: behavior2color[messages[1]], content: messages[1] });
        } else {
          listData.push({ color: behavior2color[behavior[index]], content: behavior[index] });
        }
      }
    }

    return listData;
  }

  function dateCellRender(value) {
    const listData = getDateData(value);
    return listData.map((item) => (
      <Badge
        style={{ display: "block" }}
        color={item.color}
        text={item.content}
      />
    ));
  }

  return <Calendar dateCellRender={dateCellRender} />;
};
export default myCalendar;