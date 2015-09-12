# Animation Collections
# by Isaac Weinhausen
# http://isaacw.com




# Import modules
# -------------------------------------

{AnimationSequence} = require "AnimationSequence"
{AnimationSet} = require "AnimationSet"




# App
# -------------------------------------


# Override defaults
Framer.Defaults.Layer.backgroundColor = "#877DD7"
Framer.Defaults.Animation.time = 0.75


# Set canvas props
bg1 = new BackgroundLayer 
	backgroundColor: "#292929"
	
bg2 = new BackgroundLayer 
# 	backgroundColor: "white"
	backgroundColor: "#000"

# Render shape
square = new Layer
	width: 80
	height: 80
	borderRadius: 8
square.center()

# Define animations
rotateAnimation = new Animation
	layer: square
	properties: 
		rotation: 360

scaleAnimation = new Animation
	layer: square
	properties: 
		scale: 2

fadeBgAnimation = new Animation
	layer: bg1
	properties: 
		opacity: 0

tweenAnimation = new Animation
	layer: square
	properties: 
		borderRadius: 40

# Create an animation sequence and add animations
squaresAnimation = new AnimationSequence
	animations: [
		rotateAnimation
		scaleAnimation
		fadeBgAnimation
		tweenAnimation
	]

# Call the start() method to see it in action
squaresAnimation.start()



