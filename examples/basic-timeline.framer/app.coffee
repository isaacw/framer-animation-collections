# Basic Timeline
# by Isaac Weinhausen
# http://isaacw.com




# Import classes
# -------------------------------------

{AnimationSequence} = require "AnimationSequence"
{AnimationSet} = require "AnimationSet"
{AnimationTimeline} = require "AnimationTimeline"




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
Framer.Defaults.Layer.borderRadius = 8
Framer.Defaults.Layer.backgroundColor = "white"
Framer.Defaults.Animation.time = 1


# Set canvas props
bg = new BackgroundLayer 
	backgroundColor: colors["blue"]
	borderRadius: 0




# App
# -------------------------------------


rect1 = new Layer
	width: 162
	height: 100
rect1.center()
rect1.y -= 125

rect2 = new Layer
	width: 162
	height: 100
rect2.center()

rect3 = new Layer
	width: 162
	height: 100
rect3.center()
rect3.y += 125

growAnimation = new AnimationTimeline
	animations: [
		[
			rect1.animate
				properties:
					y: rect1.y - 100
			offset: -0.3
		]
		rect3.animate
			properties:
				y: rect3.y + 100
		rect2.animate
			properties:
				scale: rect2.scale * 1.618
	]
# 	repeat: true




# Execute
# -------------------------------------

# growAnimation.start()

