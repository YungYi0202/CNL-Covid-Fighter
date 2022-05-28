function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

function getDateFootprint(filteredData) {
  /* Show the recent data first.*/
  let dict = {};
  for (const data of filteredData) {
    if (dict[data.date] === undefined) {
      dict[data.date] = [];
    }
    dict[data.date].push({
      "time": data.time,
      "location": data.location,
      "note": data.note,
      "key": data.key
    });
  }
  return dict;
}

function isDangerDateForUser(queryDate, user, incubationPeriod) {
  let confirmDate = new Date(user.confirmed_date);
  let date = new Date(queryDate);  
  let cond1 = (user.recover_date === "")? true: date < new Date(user.recover_date);
  return cond1 && (date > (confirmDate - incubationPeriod * 86400000));
}

export { getRandomInt, isValidHttpUrl, isEmpty, getDateFootprint, isDangerDateForUser };
