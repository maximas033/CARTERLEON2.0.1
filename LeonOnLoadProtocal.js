function lockdown() {
  const lockdownRef = firebase.database().ref("LOCKDOWN");

  lockdownRef.on(
    "value",
    function (snapshot) {
      const lockdownValue = snapshot.val();

      if (lockdownValue.lock === true) {
        document.getElementById("danger").style.display = "block";
        document.getElementById("centerPiece").style.display = "none";
        document.getElementById("displayImportantNews").style.display = "none";
        hideDashboard();
      } else if (lockdownValue.lock === false) {
        document.getElementById("danger").style.display = "none";
        document.getElementById("centerPiece").style.display = "block";
        GetValue();
      } else {
        GetValue();
      }
    },
    function (error) {
      console.error("Error fetching lockdown status:", error.code);
    }
  );
}

window.onload = lockdown;
