let totalscore = localStorage.getItem("totalscore");
let button1 = document.getElementById("buttonId");
let messagechange = document.getElementById("message_end")
const totals = document.getElementById('totals')
const form = document.getElementById("entername");
let numberoutof = document.getElementById("numbernum")

let answercorrect = localStorage.getItem("answercorrect")
// create and checks

//score//
let end = 'Score: ' + totalscore
totals.textContent = end

if (totalscore < 0){
  messagechange.textContent = "Better luck next time!"
}
else if (totalscore == 0){
  messagechange.textContent = "Even steven"
}



numberoutof.textContent = answercorrect


button1.addEventListener("click", function(){
  // Use the `window.location` object to redirect the user to a different page
  window.location = "startpag.html";
});