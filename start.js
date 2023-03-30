let start_b = document.getElementById("start_button")
var h1 = document.getElementById("starttitle");
var p = document.getElementById("startdes");

start_b.addEventListener("mouseover", function () {
    h1.style.color = "#8e44ad"
    p.style.color = "#8e44ad"
});

start_b.addEventListener("mouseout", function () {
  h1.style.color = "#fff"
  p.style.color = "#fff"
});

start_b.addEventListener("click", function(){
    // Use the `window.location` object to redirect the user to a different page
    window.location = "startpag.html";
  });

 
 