function showposts(){
    document.getElementById("posts-container").style.display="block";
    document.getElementById("about").style.display="none";
    document.getElementById("friends").style.display="none";
}
function showabout(){
    document.getElementById("posts-container").style.display="none";
    document.getElementById("about").style.display="block";
    document.getElementById("friends").style.display="none";
}
function showfriends(){
    document.getElementById("posts-container").style.display="none";
    document.getElementById("about").style.display="none";
    document.getElementById("friends").style.display="block";
}
function showoverview(){
    document.querySelector(".overview-content").innerHTML="<h2>Overview</h2><p>This is the overview section.</p>";
}
function showwork(){
    document.querySelector(".overview-content").innerHTML="<h2>Work and Education</h2><p>This is the work and education section.</p>";
}
function placelived(){
    document.querySelector(".overview-content").innerHTML="<h2>Place Lived</h2><p>This is the place lived section.</p>";
}

