// -----JS CODE-----
// @input SceneObject[] showOnlyOnFront
// @input SceneObject[] showOnlyOnBack
// @input SceneObject worldObj


// -----JS CODE-----
// @input Component.Camera cameraA
// @input Component.Camera cameraB
// @input bool toggle

var hasStarted = false;
var audioComponent = null;

function initCamera(eventData) {
    if (!hasStarted) {
        hasStarted = true;

    }

}

function removeAllRenderLayers(camera) {
    var renderLayers = camera.getAllRenderLayers();
    for (var i = 0; i < renderLayers.length; i++) {
        camera.removeRenderLayer(i);
    }
}

// Bind the function printTime to the event UpdateEvent
var event = script.createEvent("UpdateEvent");
event.bind(initCamera);

function audioSetup(track) {
    if (track && !audioComponent) {
        audioComponent = script.getSceneObject().createComponent("Component.AudioComponent");
        audioComponent.audioTrack = track;
    }
}

function onBackCamEvent(eventData) {
    for (var i = 0; i < script.showOnlyOnFront.length; i++) {
        script.showOnlyOnFront[i].enabled = false;
    }

    for (var i = 0; i < script.showOnlyOnBack.length; i++) {
        script.showOnlyOnBack[i].enabled = true;
    }
}
var cameraBackEvent = script.createEvent("CameraBackEvent");
cameraBackEvent.bind(onBackCamEvent);

function onFrontCamEvent(eventData) {
    for (var i = 0; i < script.showOnlyOnBack.length; i++) {
        script.showOnlyOnBack[i].enabled = false;
    }

    for (var i = 0; i < script.showOnlyOnFront.length; i++) {
        script.showOnlyOnFront[i].enabled = true;
    }
}


var cameraFrontEvent = script.createEvent("CameraFrontEvent");
cameraFrontEvent.bind(onFrontCamEvent);

