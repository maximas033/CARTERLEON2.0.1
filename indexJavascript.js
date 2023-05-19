// DISPLAYS VERY SIMPLE INFORMATION LIKE TIME AND DATE
//
//
//
function GetTheCurrentTime() {
  const date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let amOrPm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = `${hour}:${minutes} ${amOrPm}`;
  document.getElementById("DisplayCurrentTime").innerHTML = time;
}
setInterval(GetTheCurrentTime, 100);

//
//
//
function GetTheCurrentDay() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.getElementById("DisplayCurrentDay").innerHTML = days[date.getDay()];
}

setInterval(GetTheCurrentDay, 100);
