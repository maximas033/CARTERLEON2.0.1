// This will display information based if leon can hear or not;
// For example, if leon can't hear he will display information such as reminders and weather for on glance
function hideTheDay() {
  document.getElementById("DisplayCurrentDay").style.display = "none";
}

function showTheDay() {
  document.getElementById("DisplayCurrentDay").style.display = "block";
}

function showDashboard() {
  document.getElementById("topAll").style.display = "block";
  document.getElementById("topAll").style.display = "flex";
  document.getElementById("topAll").style.flexDirection = "row";
  document.getElementById("topAll").style.justifyContent = "space-between";
}

function hideDashboard() {
  document.getElementById("topAll").style.display = "none";
}

function dimTheScreen() {
  document.getElementById("display").style.opacity = "0.6";
}

function brightTheScreen() {
  document.getElementById("display").style.opacity = "1";
}
