import moment from "moment";
var days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

/**
 * truncate text
 */

export function text_truncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

/**
 * remove html tags
 */

export function strip_html_tags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  str = str.replace(/<[^>]*>/g, "");
  return (str = decode_html(str));

  // return str.replace(/<[^>]*>/g, "");
}

/**
 * decode html entities
 */
export function decode_html(str) {
  if (str === null || str === "") return str;
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
  // return str.replace(/<[^>]*>/g, "");
}

/**
 * Get random colors
 */

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getTimeInfo(data) {
  if (!data || !data.acf) return;
  let date = moment();
  let today_day = date.day();
  let day = days[today_day];
  let day_data = data.acf[day];
  if(day_data && day_data.open_24_hrs) return "Open Now"
  if (!day_data || (!day_data.opens_at && day_data.closes_at)) return;
  let opens_at = day_data.opens_at ? moment(day_data.opens_at, "hh:mm A") : "";
  let closes_at = day_data.opens_at
    ? moment(day_data.closes_at, "hh:mm A")
    : "";
  if (
    opens_at &&
    closes_at &&
    date.isAfter(opens_at) &&
    date.isBefore(closes_at)
  ) {
    return "Open Now";
  }
  if (opens_at) {
    return ` Will open at ${moment(opens_at, "hh:mm A").format("hh:mm A")}`;
  }
}
