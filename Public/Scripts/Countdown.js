// Countdown.js
// @input SceneObject WorldObject
// @input SceneObject ScoreboardGroup
// @input SceneObject goGroup
//@input Component.SpriteVisual oneText
//@input Component.SpriteVisual twoText
//@input Component.SpriteVisual threeText
//@input Component.SpriteVisual goText

var handleCountdown = script.createEvent("DelayedCallbackEvent");
var handleFinishCountdown = script.createEvent("DelayedCallbackEvent");
var handleOne = script.createEvent("DelayedCallbackEvent");
var handleTwo = script.createEvent("DelayedCallbackEvent");
var handleThree = script.createEvent("DelayedCallbackEvent");
var handleGo = script.createEvent("DelayedCallbackEvent");
script.ScoreboardGroup.enabled = global.scoreboardGroup;
script.goGroup.enabled = global.goGroup;
script.oneText.enabled = global.oneText;
script.twoText.enabled = global.twoText;
script.threeText.enabled = global.threeText;
script.goText.enabled = global.goText;


if(global.isIntro) {
  print("starting intro");
  global.isIntro = false;
  global.goGroup = true;
  global.threeText = true;
  handleCountdown.reset(1);
  
  handleCountdown.bind(function (eventData) {
    print("in countdown");
    global.scoreboardGroup = true;
    handleThree.reset(.2);
  });


  handleThree.bind(function (eventData) {
    global.threeText = true
    handleTwo.reset(.5);
  })

  handleTwo.bind(function (eventData) {
    global.threeText = false;
    global.twoText = true
    handleOne.reset(.5);
  })

  handleOne.bind(function (eventData) {
    global.twoText = false;
    global.oneText = true;
    handleGo.reset(.5);
  })

  handleGo.bind(function (eventData) {
    global.oneText = false;
    global.goText = true
    handleFinishCountdown.reset(.5);
  });

  handleFinishCountdown.bind(function (eventData) {    
    global.scoreboardGroup = false;
    global.dialGroup = true;
    global.goText = false;
    global.goGroup = false;
  });
}
