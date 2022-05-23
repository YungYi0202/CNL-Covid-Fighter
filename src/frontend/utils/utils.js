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
  for (let i = filteredData.length - 1; i >= 0; i--) {
    const data = filteredData[i];
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

export { getRandomInt, isValidHttpUrl, isEmpty, getDateFootprint };
