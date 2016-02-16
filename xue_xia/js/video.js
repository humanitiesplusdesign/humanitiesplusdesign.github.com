$(document).ready(function() {
  $('#play-video').on('click', function(ev) {

  	$(".header-content").hide();

    $('#video')[0].play();

    ev.preventDefault();
 
  });
});

var video = document.getElementById("video");

function toggleControls() {
  if (video.hasAttribute("controls")) {
     video.removeAttribute("controls")   
  } else {
     video.setAttribute("controls","controls")   
  }
}