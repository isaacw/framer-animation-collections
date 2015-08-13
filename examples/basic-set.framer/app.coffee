# Basic Set
# by Isaac Weinhausen
# http://isaacw.com




# Import classes
# -------------------------------------

{AnimationSequence} = require "AnimationSequence"
{AnimationSet} = require "AnimationSet"




# Setup
# -------------------------------------

# Remember these nice colors
colors = 
	"purple" : "#877DD7"
	"blue" : "#28affa"
	"teal" : "#2DD7AA"
	"green" : "#7DDD11"
	"darkGray" : "#292929"


# Override defaults
Framer.Defaults.Layer.backgroundColor = "white"
Framer.Defaults.Animation.time = 2


# Set canvas props
bg = new BackgroundLayer 
	backgroundColor: colors["purple"]




# App
# -------------------------------------


circle1 = new Layer
	width: 100
	height: 100
	borderRadius: 50
circle1.center()
circle1.x -= 125

circle2 = new Layer
	width: 100
	height: 100
	borderRadius: 50
circle2.center()

circle3 = new Layer
	width: 100
	height: 100
	borderRadius: 50
circle3.center()
circle3.x += 125

moveAnimation = new AnimationSet
	animations:
		1: circle1.animate
			properties:
				scale: .5
		2: circle2.animate
			properties:
				rotationX: 180
		3: circle3.animate
			properties:
				borderRadius: 8
	repeat: true




# Execute
# -------------------------------------

moveAnimation.start()

