// ThrowSnowball.js

// @input SceneObject WorldObject
// @input Component.Camera camera
// @input SceneObject rightShoulder
// @input SceneObject leftShoulder
// @input SceneObject chestPoint
// @input SceneObject ScoreboardGroup
// @input SceneObject snowball
// @input SceneObject target
// @input SceneObject dialGroup
// @input float collideDistance = 35.0
//@input Asset.Material ballMaterial
// @input Component.SpriteAligner arrow
// @input Component.Label distanceText
// @input Component.Label endPointText
// @input Component.Label targetText
// @input Component.Label cameraText
// @input Component.Label ballText
// @input Component.Label arrowText

var audioComponent = null;
script.dialGroup.enabled = global.dialGroup;
script.ScoreboardGroup.enabled = global.scoreboardGroup;
var throwDirection = new vec3(0, 0, 0);

function p(val) {
  if (global.oldVal != val) {
    print("val " + val);
  }
  global.oldVal = val;
}

var ball = script.snowball.getTransform().getWorldPosition();
var targetPosition = script.target.getTransform().getWorldPosition();

function printVec(printStr, vector) {
  print(printStr + ": " + vector.x + " " + vector.y + " " + vector.z);
}

function buildStr(printStr, vector) {
  var newStr = printStr + ": " + Math.trunc(vector.x) + " " + Math.trunc(vector.y) + " " + Math.trunc(vector.z);
  return newStr
}

if (global.firstUpdate) {
  global.firstUpdate = false;
}
function onTap(eventData) {
  if (global.userCount < 3 && !global.isThrowing) {
    print("Snowball Tapped");
    script.ballMaterial.mainPass.baseColor = new vec4(1, 1, 1, 1);
    global.dialGroup = false;
    global.isThrowing = true;

    targetPosition = script.target.getTransform().getWorldPosition();
    var rightShoulderPos = script.rightShoulder.getTransform().getWorldPosition();
    var leftShoulderPos = script.leftShoulder.getTransform().getWorldPosition();
    var chestPointPos = script.chestPoint.getTransform().getWorldPosition();
    var height = targetPosition.y + rightShoulderPos.y;
    //get the current snowball's position which is parented to a Snowball parent which
    //is parented to the camera, so when the camera moves the snowball parent moves
    var ballPos = script.snowball.getTransform().getWorldPosition();
    var arrowPosition = script.arrow.bindingPoint.x;
    global.arrowFinal = arrowPosition;
    //change hitPercentage to make game easier or harder; .5 means 50% chance of hitting
    var hitPercentage = .5;
    //maxArrowPosition is the max of the arrow_anim tween start and end x bind point
    var maxArrowPosition = .5;
    var hitLimit = hitPercentage * maxArrowPosition;
    global.collision = (global.arrowFinal < hitLimit) && (global.arrowFinal > -(hitLimit));

    var endPoint;
    if (global.collision) {
      endPoint = chestPointPos;
    } else {
      if (arrowPosition < 0) {
        endPoint = leftShoulderPos;
      } else {
        endPoint = rightShoulderPos;
      }
    }

    script.endPointText.text = buildStr("endPoint", endPoint);
    script.targetText.text = buildStr("targetPosition", targetPosition);
    script.ballText.text = buildStr("ballPos", ballPos);
    script.arrowText.text = ("arrow " + global.arrowFinal);

    printVec("endPoint", endPoint);
    print("arrowpos: " + arrowPosition);
    printVec("targetPosition in tap", targetPosition);

    global.tweenManager.setStartValue(script.WorldObject, "snowball_move", ballPos);
    global.tweenManager.setEndValue(script.WorldObject, "snowball_move", endPoint);
    global.tweenManager.startTween(script.WorldObject, "snowball_move", throwComplete, throwStart);
    global.tweenStarted = true;
  } else if (global.slappyCount === 3) {
    print("Throw limit reached! Reset the lens to play again!!");
  }
}

if (global.firstTap) {
  var tapEvent = script.createEvent("TapEvent");
  tapEvent.bind(onTap);
  global.firstTap = false;
}

function throwComplete() {
  print("throw completed");
  print("arrowFinal " + global.arrowFinal);
  script.ballMaterial.mainPass.baseColor = new vec4(1, 1, 1, 0);

  if (!global.collision) {
    print("MISS");

    var handleMiss = script.createEvent("DelayedCallbackEvent");
    handleMiss.reset(1);
    print("reloading...");
    handleMiss.bind(function (eventData) {
      print("inside handleMiss.bind function");
      global.slappyCount += 1;
      global.userCount += 1;
      global.collision = false;
      global.handleSnowballReset();
      handleDialGroupReset();
      print("reloaded!");
    });
  } else {
    print("HIT");
    global.collision = true;
    global.userScore += 1;
    global.handleSnowballReset();

    var handleCollision = script.createEvent("DelayedCallbackEvent");
    handleCollision.reset(1);
    print("reloading...");
    handleCollision.bind(function (eventData) {
      global.slappyCount += 1;
      global.userCount += 1;
      global.collision = false;
      global.arrowFinal = 10;
      handleDialGroupReset();
      print('reloaded');
    });
  }
}

function throwStart() {
  print("throw started");
}


global.handleSnowballReset = function() {
  print("resetting ball position");
  script.snowball.getTransform().setLocalPosition(new vec3(0, 0, 0))
}

function handleDialGroupReset() {
  global.dialGroup = true;
  global.isThrowing = false;
}