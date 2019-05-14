// -----JS CODE-----
// -----JS CODE-----
// @input SceneObject rotationTarget
// @input bool smoothRotation = false
// @input float rotSmoothing = 1.0


// // In this script...
// // script.getTransform() is the world.
// // script.attachTo.getTransform() is the camera.
// function getSlappyRotationToCamera(){

//     return new quat(script.getTransform().getWorldRotation().w,
//                     script.getTransform().getWorldRotation().x,
//                     script.attachTo.getTransform().getWorldRotation().y,
//                     script.getTransform().getWorldRotation().z);
// }

// if( !script.initialized ) {
//     // rotate slappy's world so he faces the camera.

//     script.getTransform().setWorldRotation(getSlappyRotationToCamera());

//     script.initialized = true;
// }


// if( script.smoothRotation ) 
// {
//     // rotate slappy's world slowly so he slowly faces the camera.
//     var currentRotation = script.getTransform().getWorldRotation();
//     var lerpedRotation = quat.slerp( currentRotation, getSlappyRotationToCamera(), script.rotSmoothing * getDeltaTime() );

//     // Set object's rotation to slerped rotation
//     script.getTransform().setWorldRotation( lerpedRotation ); 
// }
// else
// {
//     script.getTransform().setWorldRotation(getSlappyRotationToCamera());
// }
script.createEvent("LateUpdateEvent").bind(function () {
    // Get the forward vector of rotationTarget
    var forward = script.rotationTarget.getTransform().forward;

    // Flip the forward vector
    //forward.z *= -1;

    // Zero out the vertical offset to constrain rotation to Y axis
    forward.y = 0;

    // Normalize the vector
    forward = forward.normalize();

    // Create new rotation using the vector
    var rot = quat.lookAt(forward, vec3.up());

    // Apply the rotation to this SceneObject
    script.getTransform().setWorldRotation(rot);
});