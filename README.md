# Lens Studio Target Practice Example Project

# Overview

The following is a first step for getting started in Web AR using [8th Wall](https://www.8thwall.com/). (Follow the Getting Started instructions below to get setup with 8th Wall first). This does not include any code that deals with the actual 3D scene. This is just for the initial loading process which includes the following...

1. Detecting if the user is not on a supported device or browser, and providing helpful information for how to view the XR experience.

2. Displaying a loading overlay and camera permissions prompt while the scene and libraries are loading, and while the camera is starting up.

3. Hiding the scene and showing an error image when an error occurs at runtime.

4. Displaying an overlay graphic when the user turns device to enter Landscape mode.

#Throw a snowball in Snapchat's Lens Studio!

# Overview

The following is an example project that I've built enitrely in Lens Studio. THe user taps their screen in order to throw a snowball at a stationary target, a simple cube in this case, based on the position of an arrow that moves horizontally. Currently, all you'll see happen is a "Hit" or a "Miss" logged accordingly, as well as the current position of the snowball as it is thrown.

# Example

I built this script while working on Sony's Goosebumps 2 "Snowball fight with Slappy" game they release over christmas 2018. There weren't any resources at the time for building this type of interactivity. Check it out using the link below!

* [Sony's Goosebumps 2](https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=975173dcd0ba40f39d978c9e55ff73b3&metadata=01)

# Getting Started

Simply clone this repo and open the .lsproj file. Lens Studio can be a bit finicky when it comes to interacting with git, but you should recieve all of the proper scripts, graphics, etc... 

Feel free to send any questions or concerns my way! Don't be afraid to fork and submit PRs with any improvements either!!



<video src="./videos/targetPractice.mov" poster="poster.jpg" width="320" height="200" preload autoplay></video>
