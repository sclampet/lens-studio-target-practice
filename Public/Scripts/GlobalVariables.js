// GlobalVariables.js
// @input SceneObject dialGroup

//Setup API
global.snowball = false;
global.dialGroup = false;
global.collision = false;
global.isThrowing = true;
global.slappyCount = 0;
global.userCount = 0;
global.userScore = 0;
global.opponentScore = 0;
global.scoreboardGroup = false;
global.firstTap = true;
global.firstUpdate = true;
global.tweenStarted = false;
global.oldVal = 0;
global.arrowFinal = 10; 
global.isIntro = true;
global.oneText = false;
global.twoText = false;
global.threeText = false;
global.goText = false;
global.goGroup = false;

global.resetIsThrowing = function () {
  delayInitialIsThrowing.reset(4.0);
};

var delayInitialIsThrowing = script.createEvent("DelayedCallbackEvent");
delayInitialIsThrowing.reset(4.0);
delayInitialIsThrowing.bind(function (eventData) {
  global.isThrowing = false;
});


