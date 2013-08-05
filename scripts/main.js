$(document).ready(function () {
  // Store frame for motion functions
  var previousFrame;
  // Setup Leap loop with frame callback function
  var controllerOptions = {enableGestures: true};
  var $clap = $('a.clap');
  var $deck = $('p.deck');
  var hand, velocity, zVel;
  var fingers;

  var clapping = false;
  var clapCount = 0

  Leap.loop(controllerOptions, function(frame) {
    hand = frame.hands[0];
    
    if (hand) {
      fingers = hand.pointables.length;
      velocity = hand.palmVelocity; 
      yVel = velocity[1].toFixed(1);
    }

    if (frame.hands.length == 1 && fingers >= 5 && !clapping && yVel > 500) {
      console.log("PalmDirection: ", hand.direction);
      // console.log("Palm Normal: ", hand.palmNormal);
      $clap.addClass('on');
      soundHandle = document.getElementById('clap-sound');
      soundHandle.src = 'CP.WAV';
      soundHandle.play();
      $deck.html(vectorToString(velocity));
      clapping = true;
      clapCount+=1;
      setTimeout(noHighFive, 250);
    }
  });
  
  function noHighFive() {
    $clap.removeClass('on');
    clapping = false;
    $('.clap-counter').html(clapCount);
  }

});

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function placeHand () {
  var $handHolder = $('.hand');
  var w = $(window).width();
  var h = $(window).height();

  var left = Math.floor((Math.random() * w) + $handHolder.width());
  var top = Math.floor((Math.random() * h) + $handHolder.height());

  $handHolder.css({
    'left': left,
    'top' : top
  });
}

placeHand();