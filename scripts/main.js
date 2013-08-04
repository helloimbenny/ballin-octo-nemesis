$(document).ready(function () {
  // Store frame for motion functions
  var previousFrame;
  // Setup Leap loop with frame callback function
  var controllerOptions = {enableGestures: true};
  var $clap = $('a.clap');
  Leap.loop(controllerOptions, function(frame) {
    if (frame.hands.length > 0 && !$clap.hasClass('on')) {
      $clap.addClass('on');
      setTimeout(noHighFive, 1000);
    }
  });
  
  function noHighFive() {
    $clap.removeClass('on');
  }
});